import Foundation
import ExpoModulesCore
import CallKit

public class CallregisterModule: Module {
    private let callController = CXCallController()
    private var provider: CXProvider?
    public func definition() -> ModuleDefinition {
        Name("Callregister")
    
        Function("getLocalize") {
            if let localizedName = Bundle.main.infoDictionary?["CFBundleDisplayName"] as? String {
                 return localizedName
             } else {
                 return "Nombre de la Aplicación"
             }
        }

        Function("makeCall") { (phoneNumber: String) in
            let configuration = CXProviderConfiguration(localizedName: "appcall")
            configuration.supportsVideo = false
            configuration.maximumCallsPerCallGroup = 1
            configuration.supportedHandleTypes = [.phoneNumber]
            provider = CXProvider(configuration: configuration)
            
            let uuid = UUID()
            let update = CXCallUpdate()
            update.remoteHandle = CXHandle(type: .phoneNumber, value: phoneNumber)
            self.provider?.reportNewIncomingCall(with: uuid, update: update) { error in
                if let error = error {
                    print("Failed to report incoming call: \(error.localizedDescription)")
                }
            }
        }

        Function("endCall") { (uuidString: String) in
            if let uuid = UUID(uuidString: uuidString) {
                let endCallAction = CXEndCallAction(call: uuid)
                let transaction = CXTransaction(action: endCallAction)
                self.callController.request(transaction) { error in
                    if let error = error {
                        print("Failed to end call: \(error.localizedDescription)")
                    }
                }
            }
        }
    }
}
