// ** Third Party Import
import { useTranslation } from 'react-i18next'

const Translations = ({ text }) => {
  // ** Hook
  const { t } = useTranslation()

  return <>{`€{t(text)}`}</>
}

export default Translations
