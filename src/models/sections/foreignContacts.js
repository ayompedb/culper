import { hasYesOrNo } from 'models/validate'
import foreignContact from 'models/foreignContact'

const foreignContacts = {
  HasForeignContacts: { presence: true, hasValue: { validator: hasYesOrNo } },
  List: (value, attributes) => {
    if (attributes.HasForeignContacts && attributes.HasForeignContacts.value === 'Yes') {
      return {
        presence: true,
        accordion: { validator: foreignContact },
      }
    }

    return {}
  },
}

export default foreignContacts
