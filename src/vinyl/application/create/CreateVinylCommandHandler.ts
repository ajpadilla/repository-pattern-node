import { Command } from "../../../shared/domain/core/bus/Command";
import { InMemoriaCommandBus } from "../../../shared/domain/core/bus/command/InMemoriaCommandBus";
import { CommandHandler } from "../../../shared/domain/core/bus/CommandHandler";
import { ICommand } from "../../../shared/domain/core/bus/ICommand";
import { CreateVinylCommand } from "./CreateVinylCommand";
import { VinylCreate } from "./VinylCreate";

export class CreateVinylCommandHandler implements ICommand<CommandHandler> {
  constructor(private readonly vinylCreate: VinylCreate) {}

  setupSubscriptions(): void {
    InMemoriaCommandBus.register(
      this.onVinylCreatedCommand.bind(this),
      CreateVinylCommand.name
    );
  }

  private async onVinylCreatedCommand(command: Command): Promise<void> {
    (<CreateVinylCommand>command).print();

    const AddVinylToCatalogUseCaseRequestDTO = {
      artistNameOrId: (<CreateVinylCommand>command).artistNameOrId,
      artistGenres: (<CreateVinylCommand>command).artistGenres,
      albumNameOrId: (<CreateVinylCommand>command).albumNameOrId,
      albumGenres: (<CreateVinylCommand>command).albumGenres,
      albumYearReleased: (<CreateVinylCommand>command).albumYearReleased,
      traderId: (<CreateVinylCommand>command).traderId,
    };

    await this.vinylCreate.run(AddVinylToCatalogUseCaseRequestDTO);
  }
}
