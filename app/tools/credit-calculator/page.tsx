"use client";

import { useState } from "react";
import Container from "@/components/Container";
import QualificationChangeNotice from "@/components/QualificationChangeNotice";
import UniBadge from "@/components/UniBadge";
import { allProgrammes, calcRankScore } from "@/lib/programmes";

function Bar({ value, max, label }: { value: number; max: number; label: string }) {
  const pct = Math.min((value / max) * 100, 100);
  const met = value >= max;
  return (
    <div>
      <div className="flex justify-between text-sm mb-1">
        <span className="text-navy/70">{label}</span>
        <span className={`font-semibold ${met ? "text-teal" : "text-navy"}`}>{value}/{max}</span>
      </div>
      <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
        <div className={`h-full rounded-full transition-all duration-500 ${met ? "bg-teal" : "bg-gold"}`} style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}

function Check({ met, label }: { met: boolean; label: string }) {
  return (
    <div className="flex items-center gap-3 py-2">
      <span className={`text-lg ${met ? "text-teal" : "text-coral"}`}>{met ? "✅" : "❌"}</span>
      <span className={`text-sm ${met ? "text-navy" : "text-navy/70"}`}>{label}</span>
    </div>
  );
}

export default function CreditCalculatorPage() {
  const [l1, setL1] = useState(0);
  const [l2, setL2] = useState(0);
  const [l3, setL3] = useState(0);
  const [approved, setApproved] = useState(0);
  const [reading, setReading] = useState(0);
  const [writing, setWriting] = useState(0);
  const [numeracy, setNumeracy] = useState(0);
  const [selUni, setSelUni] = useState("");
  const [selProg, setSelProg] = useState("");
  const [achieved, setAchieved] = useState(0);
  const [merit, setMerit] = useState(0);
  const [excellence, setExcellence] = useState(0);

  const rankScore = calcRankScore(achieved, merit, excellence);
  const uniProgs = allProgrammes.find((u) => u.uni === selUni);
  const selectedProg = uniProgs?.programmes.find((p) => p.name === selProg);

  const ncea1Met = l1 + l2 + l3 >= 60;
  const ncea2L2 = l2 + l3 >= 60;
  const ncea2Any = l1 + l2 + l3 >= 80;
  const ncea2Met = ncea2L2 && ncea2Any;
  const ncea3L3 = l3 >= 60;
  const ncea3L2p = l2 + l3 >= 80;
  const ncea3Met = ncea3L3 && ncea3L2p;
  const ueLit = reading >= 5 && writing >= 5;
  const ueNum = numeracy >= 10;
  const ueSubj = approved >= 3;
  const ueMet = ncea3Met && ueSubj && ueLit && ueNum;

  const inp = "w-full rounded-xl border border-gray-200 px-4 py-3 text-sm text-navy focus:outline-none focus:ring-2 focus:ring-teal/30 focus:border-teal transition-colors";

  return (
    <>
      <section className="relative bg-gradient-to-br from-navy via-navy to-teal-900 py-12 sm:py-16 overflow-hidden">
        <Container className="relative">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white">NCEA Credit Calculator</h1>
          <p className="mt-3 text-white/60 text-sm sm:text-base">Enter your credits and see if you&apos;re on track for NCEA and University Entrance.</p>
        </Container>
      </section>

      <section className="py-10 sm:py-14">
        <Container>
          <div className="max-w-2xl mx-auto">
            <QualificationChangeNotice variant="inline">
              <p>This calculator is based on current NCEA requirements (valid for students graduating by 2029).</p>
            </QualificationChangeNotice>

            {/* Inputs */}
            <div className="bg-white rounded-2xl border border-gray-100 p-6 sm:p-8 mb-8 space-y-5">
              <h2 className="font-bold text-navy text-lg mb-4">Your Credits</h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-medium text-navy/50 mb-1">Level 1 credits</label>
                  <input type="number" min={0} max={200} value={l1 || ""} onChange={(e) => setL1(+e.target.value || 0)} className={inp} placeholder="0" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-navy/50 mb-1">Level 2 credits</label>
                  <input type="number" min={0} max={200} value={l2 || ""} onChange={(e) => setL2(+e.target.value || 0)} className={inp} placeholder="0" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-navy/50 mb-1">Level 3 credits</label>
                  <input type="number" min={0} max={200} value={l3 || ""} onChange={(e) => setL3(+e.target.value || 0)} className={inp} placeholder="0" />
                </div>
              </div>

              <h3 className="font-semibold text-navy text-sm pt-4 border-t border-gray-100">University Entrance</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-navy/50 mb-1">Approved subjects with 14+ L3 credits</label>
                  <select value={approved} onChange={(e) => setApproved(+e.target.value)} className={inp}>
                    {[0,1,2,3,4,5,6].map((n) => <option key={n} value={n}>{n}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-navy/50 mb-1">Numeracy credits (L1+)</label>
                  <input type="number" min={0} max={20} value={numeracy || ""} onChange={(e) => setNumeracy(+e.target.value || 0)} className={inp} placeholder="0" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-navy/50 mb-1">Reading literacy credits (L2+)</label>
                  <input type="number" min={0} max={10} value={reading || ""} onChange={(e) => setReading(+e.target.value || 0)} className={inp} placeholder="0" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-navy/50 mb-1">Writing literacy credits (L2+)</label>
                  <input type="number" min={0} max={10} value={writing || ""} onChange={(e) => setWriting(+e.target.value || 0)} className={inp} placeholder="0" />
                </div>
              </div>
            </div>

            {/* Results */}
            <div className="space-y-6">
              <div className="bg-white rounded-2xl border border-gray-100 p-6">
                <h3 className="font-bold text-navy mb-4">NCEA Level 1</h3>
                <Bar value={l1+l2+l3} max={60} label="Credits at Level 1+" />
                <p className={`mt-2 text-sm font-semibold ${ncea1Met ? "text-teal" : "text-coral"}`}>
                  {ncea1Met ? "✅ Met" : `❌ Need ${60 - (l1+l2+l3)} more credits`}
                </p>
              </div>

              <div className="bg-white rounded-2xl border border-gray-100 p-6 space-y-3">
                <h3 className="font-bold text-navy mb-4">NCEA Level 2</h3>
                <Bar value={l2+l3} max={60} label="Credits at Level 2+" />
                <Bar value={l1+l2+l3} max={80} label="Total credits (60 at L2+ plus 20 any)" />
                <p className={`mt-2 text-sm font-semibold ${ncea2Met ? "text-teal" : "text-coral"}`}>
                  {ncea2Met ? "✅ Met" : "❌ Not yet met — see requirements above"}
                </p>
              </div>

              <div className="bg-white rounded-2xl border border-gray-100 p-6 space-y-3">
                <h3 className="font-bold text-navy mb-4">NCEA Level 3</h3>
                <Bar value={l3} max={60} label="Credits at Level 3+" />
                <Bar value={l2+l3} max={80} label="Credits at Level 2+ (60 at L3+ plus 20)" />
                <p className={`mt-2 text-sm font-semibold ${ncea3Met ? "text-teal" : "text-coral"}`}>
                  {ncea3Met ? "✅ Met" : "❌ Not yet met — see requirements above"}
                </p>
              </div>

              <div className={`rounded-2xl border-2 p-6 ${ueMet ? "border-teal bg-teal-50/30" : "border-gray-100 bg-white"}`}>
                <h3 className="font-bold text-navy mb-4 text-lg">University Entrance</h3>
                <div className="space-y-1">
                  <Check met={ncea3Met} label={`NCEA Level 3 (${l3}/60 credits at L3+)`} />
                  <Check met={ueSubj} label={`3 approved subjects with 14+ credits (${approved}/3)`} />
                  <Check met={reading >= 5} label={`Reading literacy (${reading}/5 credits)`} />
                  <Check met={writing >= 5} label={`Writing literacy (${writing}/5 credits)`} />
                  <Check met={ueNum} label={`Numeracy (${numeracy}/10 credits)`} />
                </div>
                <div className="mt-4 pt-4 border-t border-gray-100">
                  <p className={`font-bold text-lg ${ueMet ? "text-teal" : "text-coral"}`}>
                    {ueMet ? "✅ University Entrance requirements met!" : "❌ University Entrance not yet met"}
                  </p>
                  {!ueMet && (
                    <p className="text-navy/60 text-sm mt-1">Keep going — check what you still need above and talk to your dean.</p>
                  )}
                </div>
              </div>
            </div>

            {/* Rank Score Calculator */}
            <div className="bg-white rounded-2xl border border-gray-100 p-6 mt-8">
              <h2 className="font-bold text-navy text-lg mb-1">Rank Score Calculator</h2>
              <p className="text-navy/50 text-xs mb-4">Auckland uses rank scores. Enter your Level 3 credit breakdown to calculate yours.</p>
              <div className="grid grid-cols-3 gap-3 mb-4">
                <div>
                  <label className="block text-xs text-navy/50 mb-1">Achieved</label>
                  <input type="number" min={0} max={200} value={achieved || ""} onChange={(e) => setAchieved(+e.target.value || 0)} className={inp} placeholder="0" />
                </div>
                <div>
                  <label className="block text-xs text-navy/50 mb-1">Merit</label>
                  <input type="number" min={0} max={200} value={merit || ""} onChange={(e) => setMerit(+e.target.value || 0)} className={inp} placeholder="0" />
                </div>
                <div>
                  <label className="block text-xs text-navy/50 mb-1">Excellence</label>
                  <input type="number" min={0} max={200} value={excellence || ""} onChange={(e) => setExcellence(+e.target.value || 0)} className={inp} placeholder="0" />
                </div>
              </div>
              <div className="p-4 bg-soft rounded-xl">
                <p className="text-sm text-navy/60">Your estimated rank score:</p>
                <p className="text-3xl font-bold text-teal">{rankScore}<span className="text-sm font-normal text-navy/40">/320</span></p>
                <p className="text-xs text-navy/40 mt-1">Best 80 credits: Achieved×2 + Merit×3 + Excellence×4</p>
              </div>
            </div>

            {/* Programme Checker */}
            <div className="bg-white rounded-2xl border border-gray-100 p-6 mt-8">
              <h2 className="font-bold text-navy text-lg mb-1">Check Programme Requirements</h2>
              <p className="text-navy/50 text-xs mb-4">Select a university and programme to see specific entry requirements.</p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
                <div>
                  <label className="block text-xs text-navy/50 mb-1">University</label>
                  <select value={selUni} onChange={(e) => { setSelUni(e.target.value); setSelProg(""); }} className={inp}>
                    <option value="">Select university...</option>
                    {allProgrammes.map((u) => (
                      <option key={u.uni} value={u.uni}>{u.uni}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs text-navy/50 mb-1">Programme</label>
                  <select value={selProg} onChange={(e) => setSelProg(e.target.value)} className={inp} disabled={!selUni}>
                    <option value="">Select programme...</option>
                    {uniProgs?.programmes.map((p) => (
                      <option key={p.name} value={p.name}>{p.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              {selectedProg && (
                <div className="p-5 bg-soft rounded-xl space-y-3">
                  <div className="flex items-center gap-2 mb-3">
                    <UniBadge uni={selUni} size="md" />
                    <div>
                      <p className="font-bold text-navy text-sm">{selectedProg.name}</p>
                      <p className="text-xs text-navy/50">{selUni}</p>
                    </div>
                  </div>

                  {/* UE check */}
                  <div className="flex items-center gap-2 py-1.5">
                    <span className={ueMet ? "text-teal" : "text-coral"}>{ueMet ? "✅" : "❌"}</span>
                    <span className="text-sm text-navy">University Entrance</span>
                  </div>

                  {/* Rank score check */}
                  {selectedProg.rankScore && (
                    <div className="flex items-center gap-2 py-1.5">
                      <span className={rankScore >= selectedProg.rankScore ? "text-teal" : "text-coral"}>
                        {rankScore >= selectedProg.rankScore ? "✅" : "❌"}
                      </span>
                      <span className="text-sm text-navy">
                        Rank score {selectedProg.rankScore}+ required (yours: {rankScore})
                      </span>
                    </div>
                  )}

                  {/* Subject requirements */}
                  {selectedProg.subjectsRequired?.map((subj) => (
                    <div key={subj} className="flex items-center gap-2 py-1.5">
                      <span className="text-gold">⚠️</span>
                      <span className="text-sm text-navy">Level 3 {subj} required/recommended</span>
                    </div>
                  ))}

                  {/* Extra requirements */}
                  {selectedProg.extras?.map((extra) => (
                    <div key={extra} className="flex items-center gap-2 py-1.5">
                      <span className="text-gold">⚠️</span>
                      <span className="text-sm text-navy font-medium">{extra}</span>
                    </div>
                  ))}

                  {/* Notes */}
                  {selectedProg.notes && (
                    <p className="text-xs text-navy/50 pt-2 border-t border-gray-200">{selectedProg.notes}</p>
                  )}
                </div>
              )}
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
