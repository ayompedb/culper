package xml

import (
	"bufio"
	"bytes"
	"encoding/json"
	"io/ioutil"
	"os"
	"os/exec"
	"path"
	"regexp"
	"strings"
	"testing"
	"time"

	"github.com/18F/e-QIP-prototype/api"
	"github.com/18F/e-QIP-prototype/api/cmd"
	"github.com/Jeffail/gabs"
	"github.com/antchfx/xmlquery"
	"github.com/benbjohnson/clock"
)

const dataDir = "testdata"
const scenarioDir = "complete-scenarios"

func TestPackage(t *testing.T) {
	application := applicationData(t)
	r := func(filepath string) map[string]interface{} {
		return readSectionData(t, filepath)
	}

	tests := []struct {
		Schema string
		Data   map[string]interface{}
	}{
		{Schema: "identification.xml", Data: application},
		{Schema: "identification-name.xml", Data: r("identification/identification-name.json")},
		{Schema: "identification-birth.xml", Data: r("identification/identification-birth.json")},
		{Schema: "identification-eyecolor.xml", Data: r("identification/identification-eyecolor.json")},
		{Schema: "identification-height.xml", Data: r("identification/identification-height.json")},
		{Schema: "identification-othernames.xml", Data: r("identification/identification-othernames.json")},
		{Schema: "identification-ssn.xml", Data: r("identification/identification-ssn.json")},
		{Schema: "identification-sex.xml", Data: r("identification/identification-sex.json")},
		{Schema: "identification-weight.xml", Data: r("identification/identification-weight.json")},
		{Schema: "financial.xml", Data: application},
		{Schema: "financial-bankruptcy.xml", Data: r("financial/financial-bankruptcy.json")},
		{Schema: "financial-card.xml", Data: r("financial/financial-card.json")},
		{Schema: "financial-credit.xml", Data: r("financial/financial-credit.json")},
		{Schema: "financial-delinquent.xml", Data: r("financial/financial-delinquent.json")},
		{Schema: "financial-gambling.xml", Data: r("financial/financial-gambling.json")},
		{Schema: "financial-nonpayment.xml", Data: r("financial/financial-nonpayment.json")},
		{Schema: "financial-taxes.xml", Data: r("financial/financial-taxes.json")},
		{Schema: "history.xml", Data: application},
		{Schema: "history-education.xml", Data: r("history/history-education.json")},
		{Schema: "history-employment.xml", Data: r("history/history-employment.json")},
		{Schema: "history-federal.xml", Data: r("history/history-federal.json")},
		{Schema: "history-residence.xml", Data: r("history/history-residence.json")},
		{Schema: "relationships.xml", Data: application},
		{Schema: "relatives-and-associates.xml", Data: r("relationships/relationships-relatives.json")},
		{Schema: "spouse-cohabitants.xml", Data: r("relationships/relationships-status-cohabitant.json")},
		{Schema: "spouse-former.xml", Data: r("spouse-former.json")},
		{Schema: "spouse-marital-status.xml", Data: r("spouse-marital-status.json")},
		{Schema: "spouse-present-marriage.xml", Data: r("spouse-present-marriage.json")},
		{Schema: "personal-references.xml", Data: r("relationships/relationships-people.json")},
		{Schema: "citizenship.xml", Data: application},
		{Schema: "citizenship-status.xml", Data: application},
		{Schema: "citizenship-multiple.xml", Data: r("citizenship/citizenship-multiple.json")},
		{Schema: "military.xml", Data: application},
		{Schema: "military-disciplinary.xml", Data: r("military/military-disciplinary.json")},
		{Schema: "military-foreign.xml", Data: r("military/military-foreign.json")},
		{Schema: "military-history.xml", Data: r("military/military-history.json")},
		{Schema: "military-selective.xml", Data: r("military/military-selective.json")},
		{Schema: "foreign.xml", Data: application},
		{Schema: "foreign-travel.xml", Data: r("foreign/foreign-travel.json")},
		{Schema: "foreign-contacts.xml", Data: r("foreign/foreign-contacts.json")},
		{Schema: "foreign-direct-interests.xml", Data: r("foreign/foreign-activities-direct.json")},
		{Schema: "foreign-indirect-interests.xml", Data: r("foreign/foreign-activities-indirect.json")},
		{Schema: "foreign-passports.xml", Data: r("citizenship/citizenship-passports.json")},
		{Schema: "foreign-realestate-holdings.xml", Data: r("foreign/foreign-activities-realestate.json")},
		{Schema: "foreign-financial-benefits.xml", Data: r("foreign/foreign-activities-benefits.json")},
		{Schema: "foreign-national-support.xml", Data: r("foreign/foreign-activities-support.json")},
		{Schema: "foreign-business-support-activities.xml", Data: r("foreign/foreign-business-advice.json")},
		{Schema: "foreign-business-consultancies.xml", Data: r("foreign/foreign-business-family.json")},
		{Schema: "foreign-business-job-offers.xml", Data: r("foreign/foreign-business-employment.json")},
		{Schema: "foreign-business-other-employment.xml", Data: r("foreign/foreign-business-ventures.json")},
		{Schema: "foreign-business-meetings.xml", Data: r("foreign/foreign-business-conferences.json")},
		{Schema: "foreign-business-government-contacts.xml", Data: r("foreign/foreign-business-contact.json")},
		{Schema: "foreign-business-sponsored-visits.xml", Data: r("foreign/foreign-business-sponsorship.json")},
		{Schema: "foreign-business-political-office.xml", Data: r("foreign/foreign-business-political.json")},
		{Schema: "foreign-business-voted.xml", Data: r("foreign/foreign-business-voting.json")},
		{Schema: "substance.xml", Data: application},
		{Schema: "substance-alcohol-additional.xml", Data: r("substance/substance-alcohol-additional.json")},
		{Schema: "substance-alcohol-negative.xml", Data: r("substance/substance-alcohol-negative.json")},
		{Schema: "substance-alcohol-ordered.xml", Data: r("substance/substance-alcohol-ordered.json")},
		{Schema: "substance-alcohol-voluntary.xml", Data: r("substance/substance-alcohol-voluntary.json")},
		{Schema: "substance-drug-clearance.xml", Data: r("substance/substance-drug-clearance.json")},
		{Schema: "substance-drug-misuse.xml", Data: r("substance/substance-drug-misuse.json")},
		{Schema: "substance-drug-ordered.xml", Data: r("substance/substance-drug-ordered.json")},
		{Schema: "substance-drug-publicsafety.xml", Data: r("substance/substance-drug-publicsafety.json")},
		{Schema: "substance-drug-purchase.xml", Data: r("substance/substance-drug-purchase.json")},
		{Schema: "substance-drug-usage.xml", Data: r("substance/substance-drug-usage.json")},
		{Schema: "substance-drug-voluntary.xml", Data: r("substance/substance-drug-voluntary.json")},
		{Schema: "legal.xml", Data: application},
		{Schema: "legal-police-offenses.xml", Data: r("legal/legal-police-offenses.json")},
		{Schema: "legal-police-additional-offenses.xml", Data: r("legal/legal-police-additionaloffenses.json")},
		{Schema: "legal-police-domestic-violence.xml", Data: r("legal/legal-police-domesticviolence.json")},
		{Schema: "legal-investigations-denied.xml", Data: r("legal/legal-investigations-revoked.json")},
		{Schema: "legal-investigations-debarment.xml", Data: r("legal/legal-investigations-debarred.json")},
		{Schema: "legal-investigations-investigated.xml", Data: r("legal/legal-investigations-history.json")},
		{Schema: "legal-court.xml", Data: r("legal/legal-court.json")},
		{Schema: "legal-technology-unauthorized.xml", Data: r("legal/legal-technology-unauthorized.json")},
		{Schema: "legal-technology-manipulating.xml", Data: r("legal/legal-technology-manipulating.json")},
		{Schema: "legal-technology-unlawful.xml", Data: r("legal/legal-technology-unlawful.json")},
		{Schema: "legal-associations-activities-to-overthrow.xml", Data: r("legal/legal-associations-activities-to-overthrow.json")},
		{Schema: "legal-associations-advocating.xml", Data: r("legal/legal-associations-advocating.json")},
		{Schema: "legal-associations-membership-violence-or-force.xml", Data: r("legal/legal-associations-membership-violence-or-force.json")},
		{Schema: "legal-associations-terrorist-organization.xml", Data: r("legal/legal-associations-terrorist-organization.json")},
		{Schema: "legal-associations-engaged-in-terrorism.xml", Data: r("legal/legal-associations-engaged-in-terrorism.json")},
		{Schema: "legal-associations-terrorism-association.xml", Data: r("legal/legal-associations-terrorism-association.json")},
		{Schema: "legal-associations-membership-overthrow.xml", Data: r("legal/legal-associations-membership-overthrow.json")},
		{Schema: "additional-comments.xml", Data: r("package/comments.json")},
		{Schema: "psychological.xml", Data: application},
		{Schema: "psychological-competence.xml", Data: r("psychological/psychological-competence.json")},
		{Schema: "psychological-conditions.xml", Data: r("psychological/psychological-conditions.json")},
		{Schema: "psychological-consultations.xml", Data: r("psychological/psychological-consultations.json")},
		{Schema: "psychological-diagnoses.xml", Data: r("psychological/psychological-diagnoses.json")},
		{Schema: "psychological-hospitalizations.xml", Data: r("psychological/psychological-hospitalizations.json")},
	}

	service := NewXMLServiceWithMockClock("../templates", mockedClock())

	re := regexp.MustCompile("map\\[")
	for _, test := range tests {
		t.Run(test.Schema, func(t *testing.T) {

			app := api.BlankApplication(-1, "SF86", "2017-07")
			p := newApplicationPackager(service, app)

			result, err := p.defaultTemplate(test.Schema, test.Data)
			if err != nil {
				t.Fatal(err)
			}
			snippet := string(result)

			if snippet == "" {
				t.Fatalf("XML derived from `%s` should not be empty", test.Schema)
			}

			// Literal Go maps in XML output point to a map being referenced directly
			// in the template instead of correctly evaluted using a helper function.
			match := re.FindStringSubmatch(snippet)
			if match != nil {
				t.Fatalf("XML derived from `%s` appears to contain a literal Go map: %s",
					test.Schema, snippet)
			}
		})
	}
}

func mockedClock() clock.Clock {
	// Epoch seconds for September 10, 2018 PST;
	// It is not a special date, just used in test fixtures.
	const base = 1536570831

	c := clock.NewMock()
	c.Add(base * time.Second)
	return c
}

func TestAddressIn(t *testing.T) {
	country := "United States"

	us := "us-address.json"
	if !addressIn(readSectionData(t, us), country) {
		t.Fatalf("%s should be in %s", us, country)
	}

	nonus := "nonus-address.json"
	if addressIn(readSectionData(t, nonus), country) {
		t.Fatalf("%s should not be in %s", nonus, country)
	}

	bad := "bad-address.json"
	if addressIn(readSectionData(t, bad), country) {
		t.Fatalf("%s should not be in %s", bad, country)
	}
}

func TestCitizenStatus(t *testing.T) {
	template := "citizenship-status.xml"
	xpath := "Citizenship/USCitizen/ProofOfUSCitizenship/USPassport"

	// Born in US with passport
	form := newForm(t,
		"citizenship/citizenship-status.json",
		"foreign/foreign-passport.json",
	)
	snippet := applyForm(t, template, form)
	assertHas1(t, template, xpath, snippet)

	// Born in US without passport
	form = newForm(t,
		"citizenship/citizenship-status.json",
		"no-passport.json",
	)
	snippet = applyForm(t, template, form)
	assertHasNone(t, template, xpath, snippet)

	// Foreign-born, but naturalized, with passport
	form = newForm(t,
		"naturalized.json",
		"foreign/foreign-passport.json",
	)
	snippet = applyForm(t, template, form)
	assertHas1(t, template, xpath, snippet)
}

func TestRelativeAddress(t *testing.T) {
	parent := "relationships.xml"
	template := "relatives-and-associates.xml"
	xpath := "RelativesAndAssociates/Relatives/Relative[1]/Address"

	// Relative is alive
	form := newForm(t,
		"relationships/relationships-relatives.json",
	)
	form = extractPart(t, form, templateContext(t, parent, template))
	snippet := applyForm(t, template, form)
	assertHas1(t, template, xpath, snippet)

	// Relative is deceased
	form = newForm(t,
		"relative-deceased.json",
	)
	form = extractPart(t, form, templateContext(t, parent, template))
	snippet = applyForm(t, template, form)
	assertHasNone(t, template, xpath, snippet)
}

func TestDocumentExpiration(t *testing.T) {
	parent := "relationships.xml"
	template := "relatives-and-associates.xml"
	xpath := "RelativesAndAssociates/Relatives/Relative[1]/Citizenship/ProofOfStatus/DocumentExpiration"

	// Document has expiration
	form := newForm(t,
		"relative-greencard.json",
	)
	form = extractPart(t, form, templateContext(t, parent, template))
	snippet := applyForm(t, template, form)
	assertHas1(t, template, xpath, snippet)

	// Document has no expiration
	form = newForm(t,
		"relative-naturalized.json",
	)
	form = extractPart(t, form, templateContext(t, parent, template))
	snippet = applyForm(t, template, form)
	assertHasNone(t, template, xpath, snippet)
}

// `test1` is a basic smoke test, a bare bones application
func Test86Scenario1(t *testing.T) {
	executeScenario(t, "SF86", "test1")
}

// `test2` is a "blow out" of these SF-86 questions:
// #21 Psychological/Emotional
// #23 Illegal Use of Drugs/Activity
// #24 Use of Alcohol
// #26 Financial Record
func Test86Scenario2(t *testing.T) {
	executeScenario(t, "SF86", "test2")
}

// `test3` is a "blow out" of these SF-86 questions:
// #20a Foreign Activities
// #20b Foreign Business, Professional
// #20c Foreign Countries you have visited
// #17 Marital/Relationship
// In addition:
// * a foreign contact where `I don't know` specified for
//   birthplace, birthdate, employer, employer address,
//   affiliations, address
// * #12.4 People Who Knew You - When a education item is
//   within 3 years, that item needs a reference/verifier.
//   However, that person does not need a name nor an email.
// * At the end of the form in Review, this test case has additional comments.
func Test86Scenario3(t *testing.T) {
	executeScenario(t, "SF86", "test3")
}

// `test4` is a "blow out" of these SF-86 questions:
// #10 Dual/Multiple Citizenship
// #15 Military history
// #27 Use of information technology systems
// #28 Involvement in non-criminal court actions
func Test86Scenario4(t *testing.T) {
	executeScenario(t, "SF86", "test4")
}

// `test5` is a "blow out" of the whole form
func Test86Scenario5(t *testing.T) {
	executeScenario(t, "SF86", "test5")
}

// `test6` is a basic smoke test, originally just created for NBIB to reject.
// `test6` is a good coarse-grained test case to extend for newly discovered
// edge cases if specific fine-grained tests don't exist. It is a bare bones
// application plus:
// * Other Foreign Benefit with Other Frequency Type and received at Other interval
// * Divorced and not currently married
// * Having an applicant that is a U.S. Citizen board abroad
// * `I don't know` for Selective Service registration
func Test86Scenario6(t *testing.T) {
	executeScenario(t, "SF86", "test6")
}

// `test7` is a "blow out" of the whole form from NBIB team
func Test86Scenario7(t *testing.T) {
	executeScenario(t, "SF86", "test7")
}

// `test8` is for:
// * 21E, explicitly answering "No" to 21A, 21B, 21C, and 21D
// * Having an applicant that is not a U.S. Citizen
func Test86Scenario8(t *testing.T) {
	executeScenario(t, "SF86", "test8")
}

// `test9` is for APO and foreign primary address/secondary (alternate) address
// workflows in the following sub-sections of the form:
// * applicant residence
// * residence verifier
// * supervisor address
// * unemployment/self-employment verifier
// * current spouse
// * relative
// * close foreign contact
func Test86Scenario9(t *testing.T) {
	executeScenario(t, "SF86", "test9")
}

// `test10` is derived from test1 for:
// * a current spouse with "I don't know" as email response
// * secondary (alternate) address workflows for employment entries
// * offense where applicant was not arrested, summoned, cited and also not charged
func Test86Scenario10(t *testing.T) {
	executeScenario(t, "SF86", "test10")
}

// `test11` is a clone of `test8` with certain revisions.
// `test11` is for:
// * Having an applicant that has ForeignBorn (aka USByBirthOutsideUS) citizenship and has a U.S. Passport
func Test86Scenario11(t *testing.T) {
	executeScenario(t, "SF86", "test11")
}

// `test1` is a basic smoke test, a bare bones application
func Test85Scenario1(t *testing.T) {
	executeScenario(t, "SF85", "test1")
}

func Test85Scenario2(t *testing.T) {
	executeScenario(t, "SF85", "test2")
}

func Test85Scenario3(t *testing.T) {
	executeScenario(t, "SF85", "test3")
}

func Test85PScenario2(t *testing.T) {
	executeScenario(t, "SF85P", "test2")
}

// executeScenario generates XML from JSON test fixtures for a complete
// applicant scenario and compares the result with XML reference files.
// It is a coarse and unforgiving test; anything less than an exact match,
// including formatting whitespace, will result in a test failure.
func executeScenario(t *testing.T, formType string, name string) {

	service := NewXMLServiceWithMockClock("../templates/", mockedClock())

	subdirs := map[string]string{
		"SF85":  "SF85",
		"SF85P": "SF85P",
		"SF86":  ".",
	}

	basename := path.Join(dataDir, scenarioDir, subdirs[formType], name)

	formBytes, readErr := ioutil.ReadFile(basename + ".json")
	if readErr != nil {
		t.Fatal(readErr)
	}

	formVersion, versionErr := api.DefaultFormVersion(formType)
	if versionErr != nil {
		t.Fatal(versionErr)
	}

	app := api.BlankApplication(-1, formType, formVersion)
	loadErr := json.Unmarshal(formBytes, &app)
	if loadErr != nil {
		t.Fatal(loadErr)
	}

	xml, xmlErr := service.PackageXML(app)
	if xmlErr != nil {
		t.Fatal(xmlErr)
	}

	formatted := formatXML(t, string(xml))

	reference, readErr := ioutil.ReadFile(basename + ".xml")
	if readErr != nil {
		t.Fatalf("Error reading reference XML `%s`: %s", name, readErr.Error())
	}

	if !bytes.Equal(formatted, reference) {
		outfile := writeXML(t, subdirs[formType], name, formatted)
		t.Fatalf("Generated XML `%s` does not match reference XML for `%s`",
			outfile, name)
	}
}

func writeXML(t *testing.T, subdir string, name string, snippet []byte) string {
	tmpfile, err := ioutil.TempFile(path.Join(dataDir, scenarioDir, subdir), name+".xml.")
	if err != nil {
		t.Fatalf("Error saving generated XML: %s", err.Error())
	}
	defer tmpfile.Close()
	_, err = tmpfile.Write(snippet)
	if err != nil {
		t.Fatalf("Error saving generated XML: %s", err.Error())
	}

	return tmpfile.Name()
}

func readReference(t *testing.T, name string) []byte {
	reference, err := ioutil.ReadFile(path.Join(dataDir, scenarioDir, name))
	if err != nil {
		t.Fatalf("Error reading reference XML `%s`: %s", name, err.Error())
	}
	return reference
}

func formatXML(t *testing.T, snippet string) []byte {
	cmd := exec.Command("xmllint", "--format", "-")
	cmd.Stdin = strings.NewReader(snippet)
	var out bytes.Buffer
	cmd.Stdout = &out
	err := cmd.Run()
	if err != nil {
		t.Fatal(err)
	}
	return out.Bytes()
}

// applicationData loads a fully-populated, valid SF-86 form with test data
func applicationData(t *testing.T) map[string]interface{} {
	return newForm(t,
		"identification/identification-name.json",
		"identification/identification-contacts.json",
		"identification/identification-othernames.json",
		"identification/identification-birthdate.json",
		"identification/identification-birthplace.json",
		"identification/identification-ssn.json",
		"identification/identification-physical.json",
		"relationships/relationships-status-marital.json",
		"relationships/relationships-status-cohabitant.json",
		"relationships/relationships-people.json",
		"relationships/relationships-relatives.json",
		"history/history-education.json",
		"history/history-employment.json",
		"history/history-federal.json",
		"history/history-residence.json",
		"citizenship/citizenship-status.json",
		"citizenship/citizenship-multiple.json",
		"citizenship/citizenship-passports.json",
		"military/military-disciplinary.json",
		"military/military-foreign.json",
		"military/military-history.json",
		"military/military-selective.json",
		"foreign/foreign-contacts.json",
		"foreign/foreign-activities-direct.json",
		"foreign/foreign-activities-indirect.json",
		"foreign/foreign-activities-realestate.json",
		"foreign/foreign-activities-benefits.json",
		"foreign/foreign-activities-support.json",
		"foreign/foreign-business-advice.json",
		"foreign/foreign-business-family.json",
		"foreign/foreign-business-employment.json",
		"foreign/foreign-business-ventures.json",
		"foreign/foreign-business-conferences.json",
		"foreign/foreign-business-contact.json",
		"foreign/foreign-business-sponsorship.json",
		"foreign/foreign-business-political.json",
		"foreign/foreign-business-voting.json",
		"foreign/foreign-passport.json",
		"foreign/foreign-travel.json",
		"substance/substance-alcohol-additional.json",
		"substance/substance-alcohol-negative.json",
		"substance/substance-alcohol-ordered.json",
		"substance/substance-alcohol-voluntary.json",
		"substance/substance-drug-clearance.json",
		"substance/substance-drug-misuse.json",
		"substance/substance-drug-ordered.json",
		"substance/substance-drug-publicsafety.json",
		"substance/substance-drug-purchase.json",
		"substance/substance-drug-usage.json",
		"substance/substance-drug-voluntary.json",
		"legal/legal-police-offenses.json",
		"legal/legal-police-additionaloffenses.json",
		"legal/legal-police-domesticviolence.json",
		"legal/legal-investigations-revoked.json",
		"legal/legal-investigations-debarred.json",
		"legal/legal-investigations-history.json",
		"legal/legal-court.json",
		"legal/legal-technology-unauthorized.json",
		"legal/legal-technology-unlawful.json",
		"legal/legal-technology-manipulating.json",
		"legal/legal-associations-activities-to-overthrow.json",
		"legal/legal-associations-advocating.json",
		"legal/legal-associations-membership-violence-or-force.json",
		"legal/legal-associations-terrorist-organization.json",
		"legal/legal-associations-engaged-in-terrorism.json",
		"legal/legal-associations-terrorism-association.json",
		"legal/legal-associations-membership-overthrow.json",
		"package/comments.json",
		"psychological/psychological-competence.json",
		"psychological/psychological-conditions.json",
		"psychological/psychological-consultations.json",
		"psychological/psychological-diagnoses.json",
		"psychological/psychological-hospitalizations.json",
	)
}

// readSectionData reads in a sub-section of test data, returning a partial form.
func readSectionData(t *testing.T, filepath string) map[string]interface{} {
	js, err := cmd.ReadSectionData(path.Join(dataDir, filepath))
	if err != nil {
		t.Fatal(err)
	}
	return js
}

// loadFormData reads in a sub-section of test data from the JSON filepath, populating the provided form.
// Form data will automatically get populated into the correct section/sub-section.
func loadFormData(t *testing.T, form map[string]interface{}, filepath string) {
	js := readSectionData(t, filepath)

	subsection, ok := js["type"].(string)
	if !ok {
		t.Fatalf("Could not identify sub-section in %s via `type`", filepath)
	}
	for _, v := range api.Catalogue() {
		if v.Payload == subsection {
			val, ok := form[v.Name].(map[string]interface{})
			if !ok {
				form[v.Name] = map[string]interface{}{}
				val = form[v.Name].(map[string]interface{})
			}
			val[v.Subsection] = js
			return
		}
	}

	t.Fatalf("No payload entry for `%s` in catalogue, from `%s`", subsection, filepath)
}

// applyForm generates an XML snippet given the path to an XML template and form data.
func applyForm(t *testing.T, template string, data map[string]interface{}) string {
	service := NewXMLServiceWithMockClock("../templates/", mockedClock())

	app := api.BlankApplication(-1, "SF86", "2017-07")
	p := newApplicationPackager(service, app)

	snippet, err := p.defaultTemplate(template, data)
	if err != nil {
		t.Fatal(err)
	}
	return string(snippet)
}

// newForm returns a form populated with data from the list of JSON filepaths.
func newForm(t *testing.T, filepaths ...string) map[string]interface{} {
	form := map[string]interface{}{}
	for _, v := range filepaths {
		loadFormData(t, form, v)
	}
	return form
}

// xmlDoc parses the XML snippet, returning a queryable XML object
func xmlDoc(t *testing.T, snippet string) *xmlquery.Node {
	doc, err := xmlquery.Parse(strings.NewReader(snippet))
	if err != nil {
		t.Fatal(err)
	}
	return doc
}

// templateContext returns the JSON path that a parent XML template file calls with a child template.
func templateContext(t *testing.T, parent string, template string) string {
	file, err := os.Open(path.Join("../templates/", parent))
	if err != nil {
		t.Fatal(err)
	}
	defer file.Close()

	scanner := bufio.NewScanner(file)
	re := regexp.MustCompile("\\{\\{tmpl.*\"" + template + "\" *([a-zA-Z.]+) *\\}\\}")
	for scanner.Scan() {
		match := re.FindStringSubmatch(scanner.Text())
		if match != nil {
			return match[1]
		}
	}

	if err := scanner.Err(); err != nil {
		t.Fatal(err)
	}

	t.Fatalf("Could not find reference to `%s` in `%s`", template, parent)

	// Can't get here, but keeps compiler happy
	return ""
}

// extractPart extracts a sub-form, given a form and a JSON path
func extractPart(t *testing.T, form map[string]interface{}, context string) map[string]interface{} {
	if context == "." {
		return form
	}

	jsonParsed, err := gabs.Consume(form)
	if err != nil {
		t.Fatal(err)
	}

	// gabs does not use `.` for tree root
	c := strings.TrimLeft(context, ".")
	value := jsonParsed.Path(c).Data()
	if value == nil {
		t.Fatalf("Could not extract `%s` from form", context)
	}

	return value.(map[string]interface{})
}

func assertHas1(t *testing.T, template string, xpath string, snippet string) {
	doc := xmlDoc(t, snippet)
	list := xmlquery.Find(doc, xpath)
	if len(list) != 1 {
		t.Fatalf("XML derived from `%s` should have `%s`: %s", template, xpath, snippet)
	}
}

func assertHasNone(t *testing.T, template string, xpath string, snippet string) {
	doc := xmlDoc(t, snippet)
	list := xmlquery.Find(doc, xpath)
	if len(list) != 0 {
		t.Fatalf("XML derived from `%s` should not have `%s`: %s", template, xpath, snippet)
	}
}

func TestFormTypeCheck(t *testing.T) {

	service := NewXMLServiceWithMockClock("../templates", mockedClock())
	app := api.BlankApplication(-1, "SF86", "2017-07")
	p := newApplicationPackager(service, app)

	tests := []struct {
		typeList   string
		shouldPass bool
	}{
		{"foo", false},
		{"SF86,SF85,SF85P", true},
		{"SF85,SF85P", false},
		{"SF86.foo,SF85", false},
		{"SF86.2017-07,SF85", true},
		{"SF86", true},
	}

	for _, test := range tests {
		if p.formType(test.typeList) != test.shouldPass {
			t.Log("Didn't match correctly: ", test.typeList)
			t.Fail()
		}
	}

}
