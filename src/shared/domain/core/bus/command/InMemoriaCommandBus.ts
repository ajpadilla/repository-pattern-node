import { Command } from "../Command";
import { CommandBus } from "../CommandBus";

export class InMemoriaCommandBus implements CommandBus {
  private static handlersMap: { [key: string]: any[] } = {};

  public static register(
    callback: (command: Command) => Promise<void>,
    commandClassName: string
  ): void {
    if (!this.handlersMap.hasOwnProperty(commandClassName)) {
      this.handlersMap[commandClassName] = [];
    }
    this.handlersMap[commandClassName].push(callback);
  }

  public static clearHandlers(): void {
    this.handlersMap = {};
  }

  static dispatch(command: Command): void {
    const eventClassName: string = command.constructor.name;

    if (this.handlersMap.hasOwnProperty(eventClassName)) {
      const handlers: any[] = this.handlersMap[eventClassName];
      for (const handler of handlers) {
        handler(command);
      }
    }
  }
}
