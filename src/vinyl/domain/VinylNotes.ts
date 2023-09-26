import { ValueObject } from "../../shared/domain/core/ValueObject";
import { Guard } from "../../shared/domain/logic/Guard";
import { Result } from "../../shared/domain/logic/Result";

interface VinylNotesProps {
  html: string;
}

export class VinylNotes extends ValueObject<VinylNotesProps> {
  public static NOTES_MAX_LENGTH = 10000;

  get value(): string {
    return this.props.html;
  }

  private constructor(props: VinylNotesProps) {
    super(props);
  }

  public static create(html: string): Result<VinylNotes> {
    const guardResult = Guard.againstNullOrUndefined(html, "html");

    if (!guardResult.succeeded) {
      return Result.fail<VinylNotes>(guardResult.message);
    }

    if (html.length >= VinylNotes.NOTES_MAX_LENGTH) {
      return Result.fail<VinylNotes>("Max length exceeded");
    }

    return Result.ok<VinylNotes>(new VinylNotes({ html }));
  }
}
