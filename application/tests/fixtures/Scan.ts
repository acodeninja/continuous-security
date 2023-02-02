import {TestScanner} from "./Scanner";
import Emitter from "../../src/Emitter";

export const TestScanInput = {
  configuration: {
    name: "test-scanner",
  },
  scanner: TestScanner,
};

export const TestScanExpectation = {
  configuration: {
    name: "test-scanner",
  },
  emitter: expect.any(Emitter),
  imageHash: "image-hash",
  output: "/tmp/prefix-random",
  scanner: TestScanner,
  report: {
    issues: [],
    counts: {
      info: 0,
      low: 0,
      moderate: 0,
      high: 0,
      critical: 0,
      total: 0,
    },
  },
};
