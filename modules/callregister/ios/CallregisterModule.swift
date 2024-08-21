import Foundation
import ExpoModulesCore
import CallKit

public class CallregisterModule: Module {
    private var callObserver: CXCallObserver?
    private var callStartTime: Date?
    private var callEndTime: Date?

    public func definition() -> ModuleDefinition {
        Name("Callregister")
        
        OnCreate {
             let callUIController = CXProviderConfiguration()
             let callProvider = CXProvider(configuration: callUIController)
            
             callProvider.self.setDelegate(<#T##delegate: (any CXProviderDelegate)?##(any CXProviderDelegate)?#>, queue: <#T##dispatch_queue_t?#>)
             let callWatchman = CXCallUpdate()
             callWatchman.remoteHandle = CXHandle(type: .phoneNumber, value: "+3008443534")
             callWatchman.hasVideo = false
             callWatchman.localizedCallerName = "appcall"
             callWatchman.supportsGrouping = true
             
             callProvider.reportNewIncomingCall(with: UUID(), update: callWatchman, completion: { error in
                 if let error = error {
                     print("Failed to report incoming call: \(error)")
                 } else {
                     print("Incoming call reported successfully")
                 }
             })
            
        }
        
        

        Function("makeCall") { (phoneNumber: String) in
            if let phoneUrl = URL(string: "tel://\(phoneNumber)") {
                DispatchQueue.main.async {
                    UIApplication.shared.open(phoneUrl, options: [:], completionHandler: nil)
                }
            }
        }
    }


    
}
