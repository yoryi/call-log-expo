import Foundation
import ExpoModulesCore
import CallKit

public class CallregisterModule: Module {
    private var callObserver: CXCallObserver?
    private var callStartTime: Date?
    private var callEndTime: Date?

    public func definition() -> ModuleDefinition {
        Name("Callregister")

        OnStartObserving {
            //print("Iniciamos")
            self.callObserver = CXCallObserver();
//            self.callObserver?.setDelegate(self, queue: DispatchQueue.main);
        }

        Function("makeCall") { (phoneNumber: String) in
            if let phoneUrl = URL(string: "tel://\(phoneNumber)") {
                DispatchQueue.main.async {
                    UIApplication.shared.open(phoneUrl, options: [:], completionHandler: nil)
                }
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

    public func callObserver(_ callObserver: CXCallObserver, callChanged call: CXCall) {
        print("Resultados", call);
        if call.hasConnected {
            print("Call has connected")
            if callStartTime == nil {
                callStartTime = Date()
            }
        }

        if call.hasEnded {
            print("Call has ended")
            if callEndTime == nil {
                callEndTime = Date()
            }
        }
    }
}
