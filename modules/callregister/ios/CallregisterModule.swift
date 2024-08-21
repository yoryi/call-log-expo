import Foundation
import ExpoModulesCore
import CallKit

public class CallregisterModule {
    private let provider: CXProvider
    private let callController = CXCallController()
    
    // MARK: - Initializer
    init(appContext: AppContext) {
        let configuration = CXProviderConfiguration(localizedName: "MyApp")
        configuration.supportsVideo = false
        configuration.maximumCallsPerCallGroup = 1
        configuration.supportedHandleTypes = [.phoneNumber]
        
        provider = CXProvider(configuration: configuration)
    }
    
    // MARK: - Module Definition
    public override func definition() -> ModuleDefinition {
        Name("Callregister")
        
        Function("makeCall") { (phoneNumber: String) in
            self.startCall(phoneNumber: phoneNumber)
        }
    }
    
    private func startCall(phoneNumber: String) {
        let handle = CXHandle(type: .phoneNumber, value: phoneNumber)
        let startCallAction = CXStartCallAction(call: UUID(), handle: handle)
        let transaction = CXTransaction(action: startCallAction)
        
        callController.request(transaction) { error in
            if let error = error {
                print("Error starting call: \(error.localizedDescription)")
            } else {
                print("Call started successfully")
            }
        }
    }
    
    // MARK: - CXProviderDelegate Implementation
    public func provider(_ provider: CXProvider, perform action: CXStartCallAction) {
        let phoneNumber = action.handle.value
        if let phoneUrl = URL(string: "tel://\(phoneNumber)") {
            DispatchQueue.main.async {
                UIApplication.shared.open(phoneUrl, options: [:], completionHandler: nil)
            }
        }
        action.fulfill()
    }
    
    public func provider(_ provider: CXProvider, perform action: CXEndCallAction) {
        // Handle end call action if needed
        action.fulfill()
    }
}
