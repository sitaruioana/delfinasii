(function(root){
const norm=s=>String(s??'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().trim().replace(/\s+/g,' ').replace(/[.!?]+$/,'');
function evaluate(m,a){const r=[norm(a.gaps[0])===norm(m.answers[0]),norm(a.gaps[1])===norm(m.answers[1]),...m.questions.map((q,i)=>a.choices[i]===0),...m.tf.map((x,i)=>a.tf[i]===x.answer)];const k=m.multiplier||1;return {correct:r,units:[r[0]?1:0,r[1]?1:0,...r.slice(2,5).map(x=>x?2:0),r.slice(5,8).every(Boolean)?1:0,r.slice(8,11).every(Boolean)?1:0].map(n=>n*k),complete:r.every(Boolean)}}
function award(attempt,e){let delta=0;e.units.forEach((n,i)=>{if(n>(attempt.credited[i]||0)){delta+=n-(attempt.credited[i]||0);attempt.credited[i]=n}});const newlyComplete=e.complete&&!attempt.finished;if(e.complete)attempt.finished=true;return {delta,newlyComplete}}
const api={norm,evaluate,award};if(typeof module!=='undefined')module.exports=api;root.DelfCore=api;
})(typeof window==='undefined'?globalThis:window);
