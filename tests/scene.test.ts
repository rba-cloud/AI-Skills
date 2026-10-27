import test from "node:test";
import assert from "node:assert/strict";
import { sceneAt, sceneFrames } from "../src/config.ts";
import { courses, tools, projects, demoStages } from "../src/data.ts";
test("camera keyframes hit specified boundaries and clamp invalid inputs", () => {
  for (const f of sceneFrames) {
    assert.equal(sceneAt(f.at).camera, f.camera);
    assert.equal(sceneAt(f.at).spread, f.spread);
  }
  assert.equal(sceneAt(-5).camera, sceneFrames[0].camera);
  assert.equal(sceneAt(5).camera, sceneFrames.at(-1)!.camera);
  assert.equal(sceneAt(NaN).camera, sceneFrames[0].camera);
  for (let i = 0; i <= 1000; i++) {
    const f = sceneAt(i / 1000);
    assert.ok(f.camera >= 5.3 && f.camera <= 6.5);
    assert.ok(f.spread >= 0 && f.spread <= 1);
    assert.ok(f.opacity >= 0 && f.opacity <= 1);
  }
});
test("course and content records do not fabricate availability or missing lessons", () => {
  assert.equal(courses.length, 5);
  for (const c of courses) {
    assert.equal(c.status, "planned");
    assert.equal(c.lessonCount, null);
    assert.ok(c.destination.startsWith("#"));
    assert.ok(c.title.en && c.title.ur);
  }
  assert.equal(demoStages.length, 3);
  assert.equal(projects.length, 4);
  for (const tool of tools) {
    assert.equal(new URL(tool.url).protocol, "https:");
    assert.ok(tool.description.ur);
  }
});
