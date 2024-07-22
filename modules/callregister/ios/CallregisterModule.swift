import ExpoModulesCore

public class CallregisterModule: Module {
  public func definition() -> ModuleDefinition {
    Name("Callregister")

    Function("hello") {
      return "Hello world! 👋"
    }

  }
}
