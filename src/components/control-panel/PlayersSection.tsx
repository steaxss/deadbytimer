import { MAX_PLAYER_NAME_LENGTH, sanitizePlayerName } from "@/utils/sanitize";

type Players = { player1: { name: string; score: number }; player2: { name: string; score: number } };
type Props = { players: Players; savePlayers: (players: Players) => void };

export default function PlayersSection({ players, savePlayers }: Props) {
  return (
<>
    {/* Players */}
    <section className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-2">
      <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md p-4">
        <div className="mb-2 text-[13px] uppercase tracking-wide font-semibold text-[#B579FF]">Player 1 <span className="text-zinc-500 font-normal normal-case text-[11px] tracking-normal">(You)</span></div>
        <input
          className="mb-3 w-full rounded-lg border border-zinc-800 bg-zinc-950/60 px-3 py-2 outline-none focus:ring-2 focus:ring-violet-500"
          value={players.player1.name}
          maxLength={MAX_PLAYER_NAME_LENGTH}
          onChange={(e) => {
            const sanitized = sanitizePlayerName(e.target.value);
            savePlayers({
              ...players,
              player1: { ...players.player1, name: sanitized },
            });
          }}
          placeholder="Player 1 name"
        />
        <div className="text-xs text-zinc-400">Score</div>
        <div className="mt-2 flex items-center gap-2">
          <button
            className="rounded-lg border border-white/20 bg-white/10 px-3 py-2 text-zinc-300 hover:bg-white/15"
            onClick={() =>
              savePlayers({
                ...players,
                player1: { ...players.player1, score: Math.max(0, players.player1.score - 1) },
              })
            }
          >
            −1
          </button>
          <div className="min-w-10 text-center text-lg font-bold text-[#5AC8FF]">{players.player1.score}</div>
          <button
            className="rounded-lg border border-[#44FF41]/20 bg-[#44FF41]/10 text-[#44FF41] px-3 py-2"
            onClick={() =>
              savePlayers({
                ...players,
                player1: { ...players.player1, score: players.player1.score + 1 },
              })
            }
          >
            +1
          </button>
        </div>
      </div>

      <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md p-4">
        <div className="mb-2 text-[13px] uppercase tracking-wide font-semibold text-[#B579FF]">Player 2 <span className="text-zinc-500 font-normal normal-case text-[11px] tracking-normal">(Your opponent)</span></div>
        <input
          className="mb-3 w-full rounded-lg border border-zinc-800 bg-zinc-950/60 px-3 py-2 outline-none focus:ring-2 focus:ring-violet-500"
          value={players.player2.name}
          maxLength={MAX_PLAYER_NAME_LENGTH}
          onChange={(e) => {
            const sanitized = sanitizePlayerName(e.target.value);
            savePlayers({
              ...players,
              player2: { ...players.player2, name: sanitized },
            });
          }}
          placeholder="Player 2 name"
        />
        <div className="text-xs text-zinc-400">Score</div>
        <div className="mt-2 flex items-center gap-2">
          <button
            className="rounded-lg border border-white/20 bg-white/10 px-3 py-2 text-zinc-300 hover:bg-white/15"
            onClick={() =>
              savePlayers({
                ...players,
                player2: { ...players.player2, score: Math.max(0, players.player2.score - 1) },
              })
            }
          >
            −1
          </button>
          <div className="min-w-10 text-center text-lg font-bold text-[#5AC8FF]">{players.player2.score}</div>
          <button
            className="rounded-lg border border-[#44FF41]/20 bg-[#44FF41]/10 text-[#44FF41] px-3 py-2"
            onClick={() =>
              savePlayers({
                ...players,
                player2: { ...players.player2, score: players.player2.score + 1 },
              })
            }
          >
            +1
          </button>
        </div>
      </div>
    </section>
</>
  );
}
