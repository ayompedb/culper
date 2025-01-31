package api

import "encoding/json"

// LegalCourt represents the payload for the legal noncriminal court section.
type LegalCourt struct {
	PayloadHasCourtActions Payload `json:"HasCourtActions" sql:"-"`
	PayloadList            Payload `json:"List" sql:"-"`

	HasCourtActions *Branch     `json:"-"`
	List            *Collection `json:"-"`
}

// Unmarshal bytes in to the entity properties.
func (entity *LegalCourt) Unmarshal(raw []byte) error {
	err := json.Unmarshal(raw, entity)
	if err != nil {
		return err
	}

	hasCourtActions, err := entity.PayloadHasCourtActions.Entity()
	if err != nil {
		return err
	}
	entity.HasCourtActions = hasCourtActions.(*Branch)

	list, err := entity.PayloadList.Entity()
	if err != nil {
		return err
	}
	entity.List = list.(*Collection)

	return err
}

// Marshal to payload structure
func (entity *LegalCourt) Marshal() Payload {
	if entity.HasCourtActions != nil {
		entity.PayloadHasCourtActions = entity.HasCourtActions.Marshal()
	}
	if entity.List != nil {
		entity.PayloadList = entity.List.Marshal()
	}
	return MarshalPayloadEntity("legal.court", entity)
}

// ClearNoBranches clears the "no" answers on application rejection
func (entity *LegalCourt) ClearNoBranches() error {
	entity.HasCourtActions.ClearNo()
	entity.List.ClearBranchNo()
	return nil
}

// LegalPoliceOffenses represents the payload for the legal police offenses section.
type LegalPoliceOffenses struct {
	PayloadHasOffenses Payload `json:"HasOffenses" sql:"-"`
	PayloadList        Payload `json:"List" sql:"-"`

	HasOffenses *Branch     `json:"-"`
	List        *Collection `json:"-"`
}

// Unmarshal bytes in to the entity properties.
func (entity *LegalPoliceOffenses) Unmarshal(raw []byte) error {
	err := json.Unmarshal(raw, entity)
	if err != nil {
		return err
	}

	hasOffenses, err := entity.PayloadHasOffenses.Entity()
	if err != nil {
		return err
	}
	entity.HasOffenses = hasOffenses.(*Branch)

	list, err := entity.PayloadList.Entity()
	if err != nil {
		return err
	}
	entity.List = list.(*Collection)

	return err
}

// Marshal to payload structure
func (entity *LegalPoliceOffenses) Marshal() Payload {
	if entity.HasOffenses != nil {
		entity.PayloadHasOffenses = entity.HasOffenses.Marshal()
	}
	if entity.List != nil {
		entity.PayloadList = entity.List.Marshal()
	}
	return MarshalPayloadEntity("legal.police.offenses", entity)
}

// ClearNoBranches clears the "no" answers on application rejection
func (entity *LegalPoliceOffenses) ClearNoBranches() error {
	entity.HasOffenses.ClearNo()

	clearErr := entity.List.ClearBranchItemsNo("WasCharged")
	if clearErr != nil {
		return clearErr
	}

	entity.List.ClearBranchNo()
	return nil
}

// LegalPoliceAdditionalOffenses represents the payload for the legal police additional offenses section.
type LegalPoliceAdditionalOffenses struct {
	PayloadHasOtherOffenses Payload `json:"HasOtherOffenses" sql:"-"`
	PayloadList             Payload `json:"List" sql:"-"`

	HasOtherOffenses *Branch     `json:"-"`
	List             *Collection `json:"-"`
}

// Unmarshal bytes in to the entity properties.
func (entity *LegalPoliceAdditionalOffenses) Unmarshal(raw []byte) error {
	err := json.Unmarshal(raw, entity)
	if err != nil {
		return err
	}

	hasOtherOffenses, err := entity.PayloadHasOtherOffenses.Entity()
	if err != nil {
		return err
	}
	entity.HasOtherOffenses = hasOtherOffenses.(*Branch)

	list, err := entity.PayloadList.Entity()
	if err != nil {
		return err
	}
	entity.List = list.(*Collection)

	return err
}

// Marshal to payload structure
func (entity *LegalPoliceAdditionalOffenses) Marshal() Payload {
	if entity.HasOtherOffenses != nil {
		entity.PayloadHasOtherOffenses = entity.HasOtherOffenses.Marshal()
	}
	if entity.List != nil {
		entity.PayloadList = entity.List.Marshal()
	}
	return MarshalPayloadEntity("legal.police.additionaloffenses", entity)
}

// ClearNoBranches clears the "no" answers on application rejection
func (entity *LegalPoliceAdditionalOffenses) ClearNoBranches() error {
	entity.HasOtherOffenses.ClearNo()

	clearErr := entity.List.ClearBranchItemsNo("WasSentenced")
	if clearErr != nil {
		return clearErr
	}

	entity.List.ClearBranchNo()
	return nil
}

// LegalPoliceDomesticViolence represents the payload for the legal police domestic violence section.
type LegalPoliceDomesticViolence struct {
	PayloadHasDomesticViolence Payload `json:"HasDomesticViolence" sql:"-"`
	PayloadList                Payload `json:"List" sql:"-"`

	HasDomesticViolence *Branch     `json:"-"`
	List                *Collection `json:"-"`
}

// Unmarshal bytes in to the entity properties.
func (entity *LegalPoliceDomesticViolence) Unmarshal(raw []byte) error {
	err := json.Unmarshal(raw, entity)
	if err != nil {
		return err
	}

	hasDomesticViolence, err := entity.PayloadHasDomesticViolence.Entity()
	if err != nil {
		return err
	}
	entity.HasDomesticViolence = hasDomesticViolence.(*Branch)

	list, err := entity.PayloadList.Entity()
	if err != nil {
		return err
	}
	entity.List = list.(*Collection)

	return err
}

// Marshal to payload structure
func (entity *LegalPoliceDomesticViolence) Marshal() Payload {
	if entity.HasDomesticViolence != nil {
		entity.PayloadHasDomesticViolence = entity.HasDomesticViolence.Marshal()
	}
	if entity.List != nil {
		entity.PayloadList = entity.List.Marshal()
	}
	return MarshalPayloadEntity("legal.police.domesticviolence", entity)
}

// ClearNoBranches clears the "no" answers on application rejection
func (entity *LegalPoliceDomesticViolence) ClearNoBranches() error {
	entity.HasDomesticViolence.ClearNo()
	entity.List.ClearBranchNo()
	return nil
}

// LegalInvestigationsDebarred represents the payload for the legal investigations debarred section.
type LegalInvestigationsDebarred struct {
	PayloadHasDebarment Payload `json:"HasDebarment" sql:"-"`
	PayloadList         Payload `json:"List" sql:"-"`

	HasDebarment *Branch     `json:"-"`
	List         *Collection `json:"-"`
}

// Unmarshal bytes in to the entity properties.
func (entity *LegalInvestigationsDebarred) Unmarshal(raw []byte) error {
	err := json.Unmarshal(raw, entity)
	if err != nil {
		return err
	}

	hasDebarment, err := entity.PayloadHasDebarment.Entity()
	if err != nil {
		return err
	}
	entity.HasDebarment = hasDebarment.(*Branch)

	list, err := entity.PayloadList.Entity()
	if err != nil {
		return err
	}
	entity.List = list.(*Collection)

	return err
}

// Marshal to payload structure
func (entity *LegalInvestigationsDebarred) Marshal() Payload {
	if entity.HasDebarment != nil {
		entity.PayloadHasDebarment = entity.HasDebarment.Marshal()
	}
	if entity.List != nil {
		entity.PayloadList = entity.List.Marshal()
	}
	return MarshalPayloadEntity("legal.investigations.debarred", entity)
}

// ClearNoBranches clears the "no" answers on application rejection
func (entity *LegalInvestigationsDebarred) ClearNoBranches() error {
	entity.HasDebarment.ClearNo()
	entity.List.ClearBranchNo()
	return nil
}

// LegalInvestigationsHistory represents the payload for the legal investigations history section.
type LegalInvestigationsHistory struct {
	PayloadHasHistory Payload `json:"HasHistory" sql:"-"`
	PayloadList       Payload `json:"List" sql:"-"`

	HasHistory *Branch     `json:"-"`
	List       *Collection `json:"-"`
}

// Unmarshal bytes in to the entity properties.
func (entity *LegalInvestigationsHistory) Unmarshal(raw []byte) error {
	err := json.Unmarshal(raw, entity)
	if err != nil {
		return err
	}

	hasHistory, err := entity.PayloadHasHistory.Entity()
	if err != nil {
		return err
	}
	entity.HasHistory = hasHistory.(*Branch)

	list, err := entity.PayloadList.Entity()
	if err != nil {
		return err
	}
	entity.List = list.(*Collection)

	return err
}

// Marshal to payload structure
func (entity *LegalInvestigationsHistory) Marshal() Payload {
	if entity.HasHistory != nil {
		entity.PayloadHasHistory = entity.HasHistory.Marshal()
	}
	if entity.List != nil {
		entity.PayloadList = entity.List.Marshal()
	}
	return MarshalPayloadEntity("legal.investigations.history", entity)
}

// ClearNoBranches clears the "no" answers on application rejection
func (entity *LegalInvestigationsHistory) ClearNoBranches() error {
	entity.HasHistory.ClearNo()
	entity.List.ClearBranchNo()
	return nil
}

// LegalInvestigationsRevoked represents the payload for the legal investigatinos revoked section.
type LegalInvestigationsRevoked struct {
	PayloadHasRevocations Payload `json:"HasRevocations" sql:"-"`
	PayloadList           Payload `json:"List" sql:"-"`

	HasRevocations *Branch     `json:"-"`
	List           *Collection `json:"-"`
}

// Unmarshal bytes in to the entity properties.
func (entity *LegalInvestigationsRevoked) Unmarshal(raw []byte) error {
	err := json.Unmarshal(raw, entity)
	if err != nil {
		return err
	}

	hasRevocations, err := entity.PayloadHasRevocations.Entity()
	if err != nil {
		return err
	}
	entity.HasRevocations = hasRevocations.(*Branch)

	list, err := entity.PayloadList.Entity()
	if err != nil {
		return err
	}
	entity.List = list.(*Collection)

	return err
}

// Marshal to payload structure
func (entity *LegalInvestigationsRevoked) Marshal() Payload {
	if entity.HasRevocations != nil {
		entity.PayloadHasRevocations = entity.HasRevocations.Marshal()
	}
	if entity.List != nil {
		entity.PayloadList = entity.List.Marshal()
	}
	return MarshalPayloadEntity("legal.investigations.revoked", entity)
}

// ClearNoBranches clears the "no" answers on application rejection
func (entity *LegalInvestigationsRevoked) ClearNoBranches() error {
	entity.HasRevocations.ClearNo()
	entity.List.ClearBranchNo()
	return nil
}

// LegalTechnologyManipulating represents the payload for the legal technology manipulating section.
type LegalTechnologyManipulating struct {
	PayloadHasManipulating Payload `json:"HasManipulating" sql:"-"`
	PayloadList            Payload `json:"List" sql:"-"`

	HasManipulating *Branch     `json:"-"`
	List            *Collection `json:"-"`
}

// Unmarshal bytes in to the entity properties.
func (entity *LegalTechnologyManipulating) Unmarshal(raw []byte) error {
	err := json.Unmarshal(raw, entity)
	if err != nil {
		return err
	}

	hasManipulating, err := entity.PayloadHasManipulating.Entity()
	if err != nil {
		return err
	}
	entity.HasManipulating = hasManipulating.(*Branch)

	list, err := entity.PayloadList.Entity()
	if err != nil {
		return err
	}
	entity.List = list.(*Collection)

	return err
}

// Marshal to payload structure
func (entity *LegalTechnologyManipulating) Marshal() Payload {
	if entity.HasManipulating != nil {
		entity.PayloadHasManipulating = entity.HasManipulating.Marshal()
	}
	if entity.List != nil {
		entity.PayloadList = entity.List.Marshal()
	}
	return MarshalPayloadEntity("legal.technology.manipulating", entity)
}

// ClearNoBranches clears the "no" answers on application rejection
func (entity *LegalTechnologyManipulating) ClearNoBranches() error {
	entity.HasManipulating.ClearNo()
	entity.List.ClearBranchNo()
	return nil
}

// LegalTechnologyUnauthorized represents the payload for the legal technology unauthorized access section.
type LegalTechnologyUnauthorized struct {
	PayloadHasUnauthorized Payload `json:"HasUnauthorized" sql:"-"`
	PayloadList            Payload `json:"List" sql:"-"`

	HasUnauthorized *Branch     `json:"-"`
	List            *Collection `json:"-"`
}

// Unmarshal bytes in to the entity properties.
func (entity *LegalTechnologyUnauthorized) Unmarshal(raw []byte) error {
	err := json.Unmarshal(raw, entity)
	if err != nil {
		return err
	}

	hasUnauthorized, err := entity.PayloadHasUnauthorized.Entity()
	if err != nil {
		return err
	}
	entity.HasUnauthorized = hasUnauthorized.(*Branch)

	list, err := entity.PayloadList.Entity()
	if err != nil {
		return err
	}
	entity.List = list.(*Collection)

	return err
}

// Marshal to payload structure
func (entity *LegalTechnologyUnauthorized) Marshal() Payload {
	if entity.HasUnauthorized != nil {
		entity.PayloadHasUnauthorized = entity.HasUnauthorized.Marshal()
	}
	if entity.List != nil {
		entity.PayloadList = entity.List.Marshal()
	}
	return MarshalPayloadEntity("legal.technology.unauthorized", entity)
}

// ClearNoBranches clears the "no" answers on application rejection
func (entity *LegalTechnologyUnauthorized) ClearNoBranches() error {
	entity.HasUnauthorized.ClearNo()
	entity.List.ClearBranchNo()
	return nil
}

// LegalTechnologyUnlawful represents the payload for the legal technology unlawful use section.
type LegalTechnologyUnlawful struct {
	PayloadHasUnlawful Payload `json:"HasUnlawful" sql:"-"`
	PayloadList        Payload `json:"List" sql:"-"`

	HasUnlawful *Branch     `json:"-"`
	List        *Collection `json:"-"`
}

// Unmarshal bytes in to the entity properties.
func (entity *LegalTechnologyUnlawful) Unmarshal(raw []byte) error {
	err := json.Unmarshal(raw, entity)
	if err != nil {
		return err
	}

	hasUnlawful, err := entity.PayloadHasUnlawful.Entity()
	if err != nil {
		return err
	}
	entity.HasUnlawful = hasUnlawful.(*Branch)

	list, err := entity.PayloadList.Entity()
	if err != nil {
		return err
	}
	entity.List = list.(*Collection)

	return err
}

// Marshal to payload structure
func (entity *LegalTechnologyUnlawful) Marshal() Payload {
	if entity.HasUnlawful != nil {
		entity.PayloadHasUnlawful = entity.HasUnlawful.Marshal()
	}
	if entity.List != nil {
		entity.PayloadList = entity.List.Marshal()
	}
	return MarshalPayloadEntity("legal.technology.unlawful", entity)
}

// ClearNoBranches clears the "no" answers on application rejection
func (entity *LegalTechnologyUnlawful) ClearNoBranches() error {
	entity.HasUnlawful.ClearNo()
	entity.List.ClearBranchNo()
	return nil
}

// LegalAssociationsActivitiesToOverthrow represents the payload for the legal associations activities to overthrow section.
type LegalAssociationsActivitiesToOverthrow struct {
	PayloadHasActivities Payload `json:"HasActivities" sql:"-"`
	PayloadList          Payload `json:"List" sql:"-"`

	HasActivities *Branch     `json:"-"`
	List          *Collection `json:"-"`
}

// Unmarshal bytes in to the entity properties.
func (entity *LegalAssociationsActivitiesToOverthrow) Unmarshal(raw []byte) error {
	err := json.Unmarshal(raw, entity)
	if err != nil {
		return err
	}

	hasActivities, err := entity.PayloadHasActivities.Entity()
	if err != nil {
		return err
	}
	entity.HasActivities = hasActivities.(*Branch)

	list, err := entity.PayloadList.Entity()
	if err != nil {
		return err
	}
	entity.List = list.(*Collection)

	return err
}

// Marshal to payload structure
func (entity *LegalAssociationsActivitiesToOverthrow) Marshal() Payload {
	if entity.HasActivities != nil {
		entity.PayloadHasActivities = entity.HasActivities.Marshal()
	}
	if entity.List != nil {
		entity.PayloadList = entity.List.Marshal()
	}
	return MarshalPayloadEntity("legal.associations.activities-to-overthrow", entity)
}

// ClearNoBranches clears the "no" answers on application rejection
func (entity *LegalAssociationsActivitiesToOverthrow) ClearNoBranches() error {
	entity.HasActivities.ClearNo()
	entity.List.ClearBranchNo()
	return nil
}

// LegalAssociationsAdvocating represents the payload for the legal associations advocating section.
type LegalAssociationsAdvocating struct {
	PayloadHasAdvocated Payload `json:"HasAdvocated" sql:"-"`
	PayloadList         Payload `json:"List" sql:"-"`

	HasAdvocated *Branch     `json:"-"`
	List         *Collection `json:"-"`
}

// Unmarshal bytes in to the entity properties.
func (entity *LegalAssociationsAdvocating) Unmarshal(raw []byte) error {
	err := json.Unmarshal(raw, entity)
	if err != nil {
		return err
	}

	hasAdvocated, err := entity.PayloadHasAdvocated.Entity()
	if err != nil {
		return err
	}
	entity.HasAdvocated = hasAdvocated.(*Branch)

	list, err := entity.PayloadList.Entity()
	if err != nil {
		return err
	}
	entity.List = list.(*Collection)

	return err
}

// Marshal to payload structure
func (entity *LegalAssociationsAdvocating) Marshal() Payload {
	if entity.HasAdvocated != nil {
		entity.PayloadHasAdvocated = entity.HasAdvocated.Marshal()
	}
	if entity.List != nil {
		entity.PayloadList = entity.List.Marshal()
	}
	return MarshalPayloadEntity("legal.associations.advocating", entity)
}

// ClearNoBranches clears the "no" answers on application rejection
func (entity *LegalAssociationsAdvocating) ClearNoBranches() error {
	entity.HasAdvocated.ClearNo()
	entity.List.ClearBranchNo()
	return nil
}

// LegalAssociationsEngagedInTerrorism represents the payload for the legal associations engaged in terrorism section.
type LegalAssociationsEngagedInTerrorism struct {
	PayloadHasEngaged Payload `json:"HasEngaged" sql:"-"`
	PayloadList       Payload `json:"List" sql:"-"`

	HasEngaged *Branch     `json:"-"`
	List       *Collection `json:"-"`
}

// Unmarshal bytes in to the entity properties.
func (entity *LegalAssociationsEngagedInTerrorism) Unmarshal(raw []byte) error {
	err := json.Unmarshal(raw, entity)
	if err != nil {
		return err
	}

	hasEngaged, err := entity.PayloadHasEngaged.Entity()
	if err != nil {
		return err
	}
	entity.HasEngaged = hasEngaged.(*Branch)

	list, err := entity.PayloadList.Entity()
	if err != nil {
		return err
	}
	entity.List = list.(*Collection)

	return err
}

// Marshal to payload structure
func (entity *LegalAssociationsEngagedInTerrorism) Marshal() Payload {
	if entity.HasEngaged != nil {
		entity.PayloadHasEngaged = entity.HasEngaged.Marshal()
	}
	if entity.List != nil {
		entity.PayloadList = entity.List.Marshal()
	}
	return MarshalPayloadEntity("legal.associations.engaged-in-terrorism", entity)
}

// ClearNoBranches clears the "no" answers on application rejection
func (entity *LegalAssociationsEngagedInTerrorism) ClearNoBranches() error {
	entity.HasEngaged.ClearNo()
	entity.List.ClearBranchNo()
	return nil
}

// LegalAssociationsMembershipOverthrow represents the payload for the legal associations membership to overthrow government section.
type LegalAssociationsMembershipOverthrow struct {
	PayloadHasOverthrow Payload `json:"HasOverthrow" sql:"-"`
	PayloadList         Payload `json:"List" sql:"-"`

	HasOverthrow *Branch     `json:"-"`
	List         *Collection `json:"-"`
}

// Unmarshal bytes in to the entity properties.
func (entity *LegalAssociationsMembershipOverthrow) Unmarshal(raw []byte) error {
	err := json.Unmarshal(raw, entity)
	if err != nil {
		return err
	}

	hasOverthrow, err := entity.PayloadHasOverthrow.Entity()
	if err != nil {
		return err
	}
	entity.HasOverthrow = hasOverthrow.(*Branch)

	list, err := entity.PayloadList.Entity()
	if err != nil {
		return err
	}
	entity.List = list.(*Collection)

	return err
}

// Marshal to payload structure
func (entity *LegalAssociationsMembershipOverthrow) Marshal() Payload {
	if entity.HasOverthrow != nil {
		entity.PayloadHasOverthrow = entity.HasOverthrow.Marshal()
	}
	if entity.List != nil {
		entity.PayloadList = entity.List.Marshal()
	}
	return MarshalPayloadEntity("legal.associations.membership-overthrow", entity)
}

// ClearNoBranches clears the "no" answers on application rejection
func (entity *LegalAssociationsMembershipOverthrow) ClearNoBranches() error {
	entity.HasOverthrow.ClearNo()
	entity.List.ClearBranchNo()
	return nil
}

// LegalAssociationsMembershipViolence represents the payload for the legal associations memberhisp advocating violence section.
type LegalAssociationsMembershipViolence struct {
	PayloadHasViolence Payload `json:"HasViolence" sql:"-"`
	PayloadList        Payload `json:"List" sql:"-"`

	HasViolence *Branch     `json:"-"`
	List        *Collection `json:"-"`
}

// Unmarshal bytes in to the entity properties.
func (entity *LegalAssociationsMembershipViolence) Unmarshal(raw []byte) error {
	err := json.Unmarshal(raw, entity)
	if err != nil {
		return err
	}

	hasViolence, err := entity.PayloadHasViolence.Entity()
	if err != nil {
		return err
	}
	entity.HasViolence = hasViolence.(*Branch)

	list, err := entity.PayloadList.Entity()
	if err != nil {
		return err
	}
	entity.List = list.(*Collection)

	return err
}

// Marshal to payload structure
func (entity *LegalAssociationsMembershipViolence) Marshal() Payload {
	if entity.HasViolence != nil {
		entity.PayloadHasViolence = entity.HasViolence.Marshal()
	}
	if entity.List != nil {
		entity.PayloadList = entity.List.Marshal()
	}
	return MarshalPayloadEntity("legal.associations.membership-violence-or-force", entity)
}

// ClearNoBranches clears the "no" answers on application rejection
func (entity *LegalAssociationsMembershipViolence) ClearNoBranches() error {
	entity.HasViolence.ClearNo()
	entity.List.ClearBranchNo()
	return nil
}

// LegalAssociationsTerrorismAssociation represents the payload for the legal associations with terrorism section.
type LegalAssociationsTerrorismAssociation struct {
	PayloadHasTerrorism Payload `json:"HasTerrorism" sql:"-"`
	PayloadExplanation  Payload `json:"Explanation" sql:"-"`

	HasTerrorism *Branch   `json:"-"`
	Explanation  *Textarea `json:"-"`
}

// Unmarshal bytes in to the entity properties.
func (entity *LegalAssociationsTerrorismAssociation) Unmarshal(raw []byte) error {
	err := json.Unmarshal(raw, entity)
	if err != nil {
		return err
	}

	hasTerrorism, err := entity.PayloadHasTerrorism.Entity()
	if err != nil {
		return err
	}
	entity.HasTerrorism = hasTerrorism.(*Branch)

	explanation, err := entity.PayloadExplanation.Entity()
	if err != nil {
		return err
	}
	entity.Explanation = explanation.(*Textarea)

	return err
}

// Marshal to payload structure
func (entity *LegalAssociationsTerrorismAssociation) Marshal() Payload {
	if entity.HasTerrorism != nil {
		entity.PayloadHasTerrorism = entity.HasTerrorism.Marshal()
	}
	if entity.Explanation != nil {
		entity.PayloadExplanation = entity.Explanation.Marshal()
	}
	return MarshalPayloadEntity("legal.associations.terrorism-association", entity)
}

// ClearNoBranches clears the "no" answers on application rejection
func (entity *LegalAssociationsTerrorismAssociation) ClearNoBranches() error {
	entity.HasTerrorism.ClearNo()
	return nil
}

// LegalAssociationsTerroristOrganization represents the payload for the legal associations with terrorist organizations section.
type LegalAssociationsTerroristOrganization struct {
	PayloadHasTerrorist Payload `json:"HasTerrorist" sql:"-"`
	PayloadList         Payload `json:"List" sql:"-"`

	HasTerrorist *Branch     `json:"-"`
	List         *Collection `json:"-"`
}

// Unmarshal bytes in to the entity properties.
func (entity *LegalAssociationsTerroristOrganization) Unmarshal(raw []byte) error {
	err := json.Unmarshal(raw, entity)
	if err != nil {
		return err
	}

	hasTerrorist, err := entity.PayloadHasTerrorist.Entity()
	if err != nil {
		return err
	}
	entity.HasTerrorist = hasTerrorist.(*Branch)

	list, err := entity.PayloadList.Entity()
	if err != nil {
		return err
	}
	entity.List = list.(*Collection)

	return err
}

// Marshal to payload structure
func (entity *LegalAssociationsTerroristOrganization) Marshal() Payload {
	if entity.HasTerrorist != nil {
		entity.PayloadHasTerrorist = entity.HasTerrorist.Marshal()
	}
	if entity.List != nil {
		entity.PayloadList = entity.List.Marshal()
	}
	return MarshalPayloadEntity("legal.associations.terrorist-organization", entity)
}

// ClearNoBranches clears the "no" answers on application rejection
func (entity *LegalAssociationsTerroristOrganization) ClearNoBranches() error {
	entity.HasTerrorist.ClearNo()
	entity.List.ClearBranchNo()
	return nil
}
