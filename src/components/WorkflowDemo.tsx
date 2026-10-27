"use client";

import { useState } from "react";
import { ArrowRight, CheckCircle2 } from "lucide-react";

const demos = [
  { task: "Research a topic", flow: "Question → source plan → compare → verify", result: "A cited research outline ready for human review." },
  { task: "Make a presentation", flow: "Audience → story → slides → refine", result: "A clear deck structure with visual directions." },
  { task: "Build a website", flow: "Brief → prototype → test → improve", result: "A working prototype and an actionable QA list." },
  { task: "Plan a video", flow: "Message → scenes → frames → edit", result: "A scene plan with continuity checks." },
];

export function WorkflowDemo() {
  const [active, setActive] = useState(0);
  return (
    <div className="workflow-demo">
      <div className="demo-nav" role="tablist" aria-label="Choose an example task">
        {demos.map((demo, index) => <button key={demo.task} role="tab" aria-selected={active === index} onClick={() => setActive(index)}>{demo.task}</button>)}
      </div>
      <div className="demo-output" role="tabpanel">
        <div><span>Selected task</span><strong>{demos[active].task}</strong></div><ArrowRight aria-hidden="true" />
        <div><span>Human-led workflow</span><strong>{demos[active].flow}</strong></div><ArrowRight aria-hidden="true" />
        <div className="demo-result"><CheckCircle2 aria-hidden="true" /><span>Illustrative result</span><strong>{demos[active].result}</strong></div>
      </div>
      <p className="demo-disclosure">Demo only — examples are prerecorded and are not connected to an AI model.</p>
    </div>
  );
}
