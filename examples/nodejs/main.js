// Use an older algorithm to force SAST scans to fail.
require("crypto")
  .createHash("md5")
  .update("Man oh man do I love node!")
  .digest("hex");

"".match(/`(?:\\[\s\S]|\${(?:[^{}]|{(?:[^{}]|{[^}]*})*})*}|(?!\${)[^\\`])*`/g);
