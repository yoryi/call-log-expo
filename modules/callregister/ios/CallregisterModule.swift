import Foundation
import ExpoModulesCore
import CallKit

public class CallregisterModule: Module {
    public func definition() -> ModuleDefinition {
        Name("Callregister")

        Function("makeCall") { (phoneNumber: String) in
            if let phoneUrl = URL(string: "tel://\(phoneNumber)") {
                DispatchQueue.main.async {
                    UIApplication.shared.open(phoneUrl, options: [:], completionHandler: nil)
                }
            }
        }
    }
}
