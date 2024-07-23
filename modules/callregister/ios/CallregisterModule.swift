import Foundation
import ExpoModulesCore
import CallKit

public class CallregisterModule: Module {
    private var callObserver: CXCallObserver?
    private var callStartTime: Date?
    private var callEndTime: Date?

    // Definition for the module
    public func definition() -> ModuleDefinition {
        Name("Callregister")

        OnStartObserving {
            // Initialize and set up the call observer
            print("Iniciamos")
//            self.callObserver = CXCallObserver()
        }

        Function("makeCall") { (phoneNumber: String) in
            // Make a phone call
            if let phoneUrl = URL(string: "tel://\(phoneNumber)") {
                UIApplication.shared.open(phoneUrl)
            }
        }

        Function("getCallStartTime") {
            // Return the start time of the call
            return self.callStartTime?.timeIntervalSince1970
        }

        Function("getCallEndTime") {
            // Return the end time of the call
            return self.callEndTime?.timeIntervalSince1970
        }

        OnStopObserving {
            // Clean up the call observer
            print("Terminamos")
            self.callObserver?.setDelegate(nil, queue: nil)
            self.callObserver = nil
        }
    }
    

    // CXCallObserverDelegate method
    @objc public func callObserver(_ callObserver: CXCallObserver, callChanged call: CXCall) {
        if call.hasConnected {
            print("hasConnected")
            // Set call start time when the call connects
            if callStartTime == nil {
                callStartTime = Date()
            }
        }

        if call.hasEnded {
            print("hasEnded")
            // Set call end time when the call ends
            if callEndTime == nil {
                callEndTime = Date()
            }
        }
    }
}
