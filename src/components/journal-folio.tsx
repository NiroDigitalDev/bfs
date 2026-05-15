import { romanNumeral } from "@/lib/journal";

type Props =
  | { variant: "index"; total: number }
  | { variant: "post"; piece: number; total: number };

export function JournalFolio(props: Props) {
  const totalRoman = romanNumeral(props.total);
  const isPost = props.variant === "post";
  const pieceRoman = isPost ? romanNumeral(props.piece) : null;

  return (
    <aside className="folio" data-variant="journal" aria-hidden>
      <span className="folio-edge folio-edge-left">
        <span className="folio-mark">§</span>
        <span className="folio-slot">
          <em className="folio-numeral">III</em>
          <span className="folio-sep" aria-hidden>
            ·
          </span>
          <span className="folio-label">
            {isPost ? (
              <>
                Piece{" "}
                <em className="folio-piece-num">{pieceRoman}</em>
              </>
            ) : (
              "The Journal"
            )}
          </span>
        </span>
      </span>
      <span className="folio-edge folio-edge-right">
        <span className="folio-slot">
          <span className="folio-page">{isPost ? "p." : "pp."}</span>
          {isPost ? (
            <>
              <em className="folio-folio">{pieceRoman}</em>
              <span className="folio-sep folio-sep-fraction" aria-hidden>
                /
              </span>
              <em className="folio-folio">{totalRoman}</em>
            </>
          ) : (
            <>
              <em className="folio-folio">I</em>
              <span className="folio-sep folio-sep-range" aria-hidden>
                –
              </span>
              <em className="folio-folio">{totalRoman}</em>
            </>
          )}
        </span>
        <span className="folio-sep" aria-hidden>
          ·
        </span>
        <span className="folio-edition">MMXXVI</span>
      </span>
    </aside>
  );
}
