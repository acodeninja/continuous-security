module.exports = `<?xml version="1.0" encoding="US-ASCII"?>
<cve xmlns="http://cve.mitre.org/cve/downloads/1.0"
     xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" 
     xsi:noNamespaceSchemaLocation="https://cve.mitre.org/schema/cve/cve_1.0.xsd">
  <item name="CVE-2021-32819" seq="2021-32819" type="CAN">
    <status>Candidate</status>
    <phase date="20210512">Assigned</phase>
    <desc>Squirrelly is a template engine implemented in JavaScript that works out of the box with ExpressJS. Squirrelly mixes pure template data with engine configuration options through the Express render API. By overwriting internal configuration options remote code execution may be triggered in downstream applications. There is currently no fix for these issues as of the publication of this CVE. The latest version of squirrelly is currently 8.0.8. For complete details refer to the referenced GHSL-2021-023.</desc>
    <refs>
      <ref source="MISC" url="https://securitylab.github.com/advisories/GHSL-2021-023-squirrelly/">https://securitylab.github.com/advisories/GHSL-2021-023-squirrelly/</ref>
      <ref source="MISC" url="https://www.npmjs.com/package/squirrelly">https://www.npmjs.com/package/squirrelly</ref>
    </refs>
    <votes/>
    <comments/>
  </item>
</cve>`;
