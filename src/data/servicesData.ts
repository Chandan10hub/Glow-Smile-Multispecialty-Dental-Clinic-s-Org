import { ServiceItem } from '../types/index.ts';

export const SERVICES_DATA: ServiceItem[] = [
  {
    id: 'birth-cert',
    titleEn: 'Birth Certificate Assistance',
    titleKn: 'ಜನನ ಪ್ರಮಾಣಪತ್ರ ನೆರವು',
    shortDescEn: 'Assistance with new birth registrations (within 21 days), delayed registration guidance, and issuance of certified copies.',
    shortDescKn: '21 ದಿನಗಳ ಒಳಗಿನ ಜನನ ನೋಂದಣಿ, ತಡವಾದ ನೋಂದಣಿ ಮಾರ್ಗದರ್ಶನ ಮತ್ತು ದೃಢೀಕೃತ ಪ್ರತಿಗಳ ವಿತರಣೆ.',
    category: 'Civil Registration',
    badgeEn: 'Registration of Births & Deaths Act 1969',
    badgeKn: 'ಜನನ ಮತ್ತು ಮರಣ ನೋಂದಣಿ ಕಾಯ್ದೆ 1969',
    iconName: 'Baby',
    eligibilityEn: [
      'Child born within the territorial jurisdiction of Kumbalgodu Gram Panchayat.',
      'Parents or authorized primary family relative residing in Kumbalgodu.',
      'Institutional births: Hospital birth intimation (Form 1) forwarded by authorized healthcare facility.',
      'Domiciliary births (at home): Intimation by head of household or village health worker (ANM/ASHA).'
    ],
    eligibilityKn: [
      'ಕುಂಬಳಗೋಡು ಗ್ರಾಮ ಪಂಚಾಯಿತಿ ವ್ಯಾಪ್ತಿಯಲ್ಲಿ ಜನಿಸಿದ ಮಕ್ಕಳು.',
      'ಕುಂಬಳಗೋಡಿನಲ್ಲಿ ವಾಸವಾಗಿರುವ ಪೋಷಕರು ಅಥವಾ ಕುಟುಂಬದ ಅಧಿಕೃತ ರಕ್ತಸಂಬಂಧಿ.',
      'ಆಸ್ಪತ್ರೆಯಲ್ಲಿ ಜನನ: ಆರೋಗ್ಯ ಕೇಂದ್ರದಿಂದ ನೀಡಲಾದ ನಮೂನೆ 1 ಜನನ ಮಾಹಿತಿ ಪತ್ರ.',
      'ಮನೆಯಲ್ಲಿ ಜನನ: ಕುಟುಂಬದ ಮುಖ್ಯಸ್ಥರು ಅಥವಾ ಗ್ರಾಮ ಆಶಾ/ಎಎನ್‌ಎಂ ಕಾರ್ಯಕರ್ತೆಯರ ದೃಢೀಕರಣ.'
    ],
    requiredDocsEn: [
      { name: 'Hospital Discharge Summary / Birth Intimation Form 1', type: 'Original', description: 'Original intimation slip issued by hospital/nursing home.' },
      { name: 'Parents Aadhaar Cards', type: 'Photocopy', description: 'Self-attested photocopies of both father and mother Aadhaar cards.' },
      { name: 'Parents Marriage Certificate / Joint Declaration', type: 'Photocopy', description: 'Copy of marriage certificate or joint ration card showing family linkage.' },
      { name: 'Address Proof of Kumbalgodu Residence', type: 'Photocopy', description: 'Voter ID, Electricity bill, or Gram Panchayat property tax receipt.' },
      { name: 'Affidavit for Delayed Registration (>21 Days)', type: 'Original', description: 'Notarized affidavit stating reason for delayed reporting (if applicable).' }
    ],
    requiredDocsKn: [
      { name: 'ಆಸ್ಪತ್ರೆಯ ಡಿಸ್ಚಾರ್ಜ್ ಸಾರಾಂಶ / ನಮೂನೆ 1 ಜನನ ಮಾಹಿತಿ', type: 'Original', description: 'ಆಸ್ಪತ್ರೆಯಿಂದ ನೀಡಲಾದ ಮೂಲ ಜನನ ಮಾಹಿತಿ ಪತ್ರ.' },
      { name: 'ತಂದೆ ಮತ್ತು ತಾಯಿಯ ಆಧಾರ್ ಕಾರ್ಡ್', type: 'Photocopy', description: 'ಪೋಷಕರಿಬ್ಬರ ಸ್ವಯಂ-ದೃಢೀಕೃತ ಆಧಾರ್ ಕಾರ್ಡ್ ಪ್ರತಿಗಳು.' },
      { name: 'ಪೋಷಕರ ವಿವಾಹ ಪ್ರಮಾಣಪತ್ರ / ರೇಷನ್ ಕಾರ್ಡ್', type: 'Photocopy', description: 'ವಿವಾಹ ಪ್ರಮಾಣಪತ್ರ ಅಥವಾ ಕುಟುಂಬದ ಪಡಿತರ ಚೀಟಿ ಪ್ರತಿ.' },
      { name: 'ಕುಂಬಳಗೋಡು ವಿಳಾಸ ಪುರಾವೆ', type: 'Photocopy', description: 'ಮತದಾರರ ಗುರುತಿನ ಚೀಟಿ, ವಿದ್ಯುತ್ ಬಿಲ್ ಅಥವಾ ಪಂಚಾಯಿತಿ ತೆರಿಗೆ ರಶೀದಿ.' },
      { name: 'ತಡವಾದ ನೋಂದಣಿಗೆ ಅಫಿಡವಿಟ್ (21 ದಿನ ಮೀರಿದ್ದರೆ)', type: 'Original', description: 'ವಿಳಂಬಕ್ಕೆ ಕಾರಣ ತಿಳಿಸುವ ನೋಟರಿ ಪ್ರಮಾಣಪತ್ರ.' }
    ],
    guidanceEn: [
      'Reporting within 21 days is free of statutory late fee under Karnataka RBD Rules.',
      'Between 21 and 30 days: Can be registered with permission of Registrar upon payment of prescribed late fee.',
      'Between 30 days and 1 year: Requires written order of the Sub-Divisional Magistrate / Tahsildar.',
      'After verification, physical certified copy can be collected from Kumbalgodu Panchayat Counter 1 or downloaded via Seva Sindhu / e-JanMa portal.'
    ],
    guidanceKn: [
      '21 ದಿನಗಳ ಒಳಗೆ ನೋಂದಣಿ ಮಾಡುವುದು ಉಚಿತವಾಗಿರುತ್ತದೆ.',
      '21 ರಿಂದ 30 ದಿನಗಳ ನಡುವೆ: ನಿಗದಿತ ದಂಡ ಶುಲ್ಕದೊಂದಿಗೆ ಉಪ-ನೋಂದಣಾಧಿಕಾರಿಗಳ ಅನುಮತಿಯೊಂದಿಗೆ ನೋಂದಾಯಿಸಬಹುದು.',
      '30 ದಿನಗಳಿಂದ 1 ವರ್ಷದ ನಡುವೆ: ತಹಸೀಲ್ದಾರ್ ಅಥವಾ ಸಹಾಯಕ ಆಯುಕ್ತರ ಲಿಖಿತ ಆದೇಶ ಅಗತ್ಯವಿರುತ್ತದೆ.',
      'ಪರಿಶೀಲನೆಯ ನಂತರ ಕುಂಬಳಗೋಡು ಪಂಚಾಯಿತಿ ಕೌಂಟರ್ 1 ರಲ್ಲಿ ಅಥವಾ ಈ-ಜನ್ಮ ತಂತ್ರಾಂಶದ ಮೂಲಕ ಪ್ರಮಾಣಪತ್ರ ಪಡೆಯಬಹುದು.'
    ],
    officialForms: ['Form 1: Birth Report', 'Form 1A: Delayed Registration Affidavit'],
    statutoryFeeEn: 'Free within 21 days; Nominal late fee thereafter as prescribed by Govt of Karnataka.',
    statutoryFeeKn: '21 ದಿನದೊಳಗೆ ಉಚಿತ; ನಂತರ ಸರ್ಕಾರ ನಿಗದಿಪಡಿಸಿದ ಸಣ್ಣ ತಡ ಶುಲ್ಕ.',
    timeframeEn: '3 to 7 working days upon physical verification',
    timeframeKn: 'ಭೌತಿಕ ಪರಿಶೀಲನೆಯ ನಂತರ 3 ರಿಂದ 7 ಕೆಲಸದ ದಿನಗಳು',
    counterEn: 'Counter 1 (Civil Registration Desk)',
    counterKn: 'ಕೌಂಟರ್ 1 (ನಾಗರಿಕ ನೋಂದಣಿ ವಿಭಾಗ)'
  },
  {
    id: 'death-cert',
    titleEn: 'Death Certificate Assistance',
    titleKn: 'ಮರಣ ಪ್ರಮಾಣಪತ್ರ ನೆರವು',
    shortDescEn: 'Facilitation for death registration, Form 2 intimation, cremation/burial ground receipts, and certified copies.',
    shortDescKn: 'ಮರಣ ನೋಂದಣಿ, ನಮೂನೆ 2 ಮಾಹಿತಿ, ರುದ್ರಭೂಮಿ ರಶೀದಿ ಪರಿಶೀಲನೆ ಮತ್ತು ದೃಢೀಕೃತ ಪ್ರತಿಗಳ ವಿತರಣೆ.',
    category: 'Civil Registration',
    badgeEn: 'Registration of Births & Deaths Act 1969',
    badgeKn: 'ಜನನ ಮತ್ತು ಮರಣ ನೋಂದಣಿ ಕಾಯ್ದೆ 1969',
    iconName: 'FileText',
    eligibilityEn: [
      'Death occurred within the geographic borders of Kumbalgodu Gram Panchayat.',
      'Close blood relative, spouse, or legal representative of the deceased.',
      'For home deaths: Intimation accompanied by medical certificate of cause of death or local village panchanama.'
    ],
    eligibilityKn: [
      'ಕುಂಬಳಗೋಡು ಗ್ರಾಮ ಪಂಚಾಯಿತಿ ವ್ಯಾಪ್ತಿಯಲ್ಲಿ ಸಂಭವಿಸಿದ ಮರಣಗಳು.',
      'ಮೃತರ ಹತ್ತಿರದ ರಕ್ತಸಂಬಂಧಿ, ಸಂಗಾತಿ ಅಥವಾ ಕಾನೂನುಬದ್ಧ ಪ್ರತಿನಿಧಿ.',
      'ಮನೆಯಲ್ಲಿ ಸಂಭವಿಸಿದ ಸಾವುಗಳಿಗೆ: ವೈದ್ಯಕೀಯ ಕಾರಣ ಪ್ರಮಾಣಪತ್ರ ಅಥವಾ ಸ್ಥಳೀಯ ಪಂಚನಾಮೆ ವರದಿ.'
    ],
    requiredDocsEn: [
      { name: 'Hospital Death Intimation Form 2 / Medical Certificate', type: 'Original', description: 'Original cause of death certificate from attending doctor.' },
      { name: 'Cremation / Burial Ground Receipt', type: 'Original', description: 'Original receipt issued by Kumbalgodu or authorized crematorium / burial ground.' },
      { name: 'Deceased Person Aadhaar Card', type: 'Photocopy', description: 'Photocopy of Aadhaar of the deceased for surrender/record.' },
      { name: 'Applicant / Informant ID Proof', type: 'Photocopy', description: 'Aadhaar / Voter ID of the spouse or blood relative applying.' },
      { name: 'Ration Card / Family Tree Affidavit', type: 'Photocopy', description: 'Proof of relationship with the deceased.' }
    ],
    requiredDocsKn: [
      { name: 'ಆಸ್ಪತ್ರೆಯ ಮರಣ ಮಾಹಿತಿ ನಮೂನೆ 2 / ವೈದ್ಯಕೀಯ ಪ್ರಮಾಣಪತ್ರ', type: 'Original', description: 'ವೈದ್ಯರಿಂದ ನೀಡಲಾದ ಮರಣ ಕಾರಣ ಪ್ರಮಾಣಪತ್ರ.' },
      { name: 'ರುದ್ರಭೂಮಿ / ಸ್ಮಶಾನ ರಶೀದಿ', type: 'Original', description: 'ಕುಂಬಳಗೋಡು ಅಥವಾ ಅಧಿಕೃತ ಸ್ಮಶಾನದಿಂದ ನೀಡಲಾದ ಮೂಲ ರಶೀದಿ.' },
      { name: 'ಮೃತರ ಆಧಾರ್ ಕಾರ್ಡ್', type: 'Photocopy', description: 'ಮೃತರ ಆಧಾರ್ ಕಾರ್ಡ್ ಪ್ರತಿ.' },
      { name: 'ಅರ್ಜಿದಾರರ ಗುರುತಿನ ಚೀಟಿ', type: 'Photocopy', description: 'ಅರ್ಜಿ ಸಲ್ಲಿಸುವ ಸಂಗಾತಿ ಅಥವಾ ರಕ್ತಸಂಬಂಧಿಯ ಆಧಾರ್ ಕಾರ್ಡ್.' },
      { name: 'ಪಡಿತರ ಚೀಟಿ / ವಂಶವೃಕ್ಷ', type: 'Photocopy', description: 'ಮೃತರೊಂದಿಗಿನ ಸಂಬಂಧ ಸಾಬೀತುಪಡಿಸುವ ದಾಖಲೆ.' }
    ],
    guidanceEn: [
      'Must be reported within 21 days to avoid delayed registration proceedings.',
      'Informant must produce original burial/cremation slip bearing date, time, and identity details.',
      'Once verified by Village Accountant and PDO, record is entered into the state e-JanMa repository.'
    ],
    guidanceKn: [
      'ವಿಳಂಬ ತಪ್ಪಿಸಲು 21 ದಿನಗಳ ಒಳಗೆ ಕಡ್ಡಾಯವಾಗಿ ವರದಿ ಮಾಡಬೇಕು.',
      'ಸ್ಮಶಾನದ ಅಧಿಕೃತ ರಶೀದಿಯನ್ನು ಮೂಲ ಪ್ರತಿಯಲ್ಲಿ ಸಲ್ಲಿಸಬೇಕು.',
      'ಗ್ರಾಮ ಲೆಕ್ಕಾಧಿಕಾರಿ ಮತ್ತು ಪಂಚಾಯಿತಿ ಅಭಿವೃದ್ಧಿ ಅಧಿಕಾರಿ (ಪಿಡಿಒ) ಪರಿಶೀಲನೆಯ ನಂತರ ಈ-ಜನ್ಮ ತಂತ್ರಾಂಶದಲ್ಲಿ ನಮೂದಿಸಲಾಗುತ್ತದೆ.'
    ],
    officialForms: ['Form 2: Death Report', 'Form 4/4A: Cause of Death Certificate'],
    statutoryFeeEn: 'Free within 21 days; Statutory search fee for older records as per rules.',
    statutoryFeeKn: '21 ದಿನದೊಳಗೆ ಉಚಿತ; ಹಳೆಯ ದಾಖಲೆಗಳಿಗೆ ನಿಯಮಾನುಸಾರ ಹುಡುಕಾಟ ಶುಲ್ಕ.',
    timeframeEn: '3 to 5 working days',
    timeframeKn: '3 ರಿಂದ 5 ಕೆಲಸದ ದಿನಗಳು',
    counterEn: 'Counter 1 (Civil Registration Desk)',
    counterKn: 'ಕೌಂಟರ್ 1 (ನಾಗರಿಕ ನೋಂದಣಿ ವಿಭಾಗ)'
  },
  {
    id: 'cert-corrections',
    titleEn: 'Certificate Corrections and Enquiries',
    titleKn: 'ಪ್ರಮಾಣಪತ್ರ ತಿದ್ದುಪಡಿ ಮತ್ತು ವಿಚಾರಣೆ',
    shortDescEn: 'Correction of spelling mistakes, surname omission, date errors, or parentage details in existing issued certificates.',
    shortDescKn: 'ಹಿಂದೆ ನೀಡಲಾದ ಪ್ರಮಾಣಪತ್ರಗಳಲ್ಲಿ ಹೆಸರು, ತಂದೆ/ತಾಯಿ ಹೆಸರು, ದಿನಾಂಕ ಅಥವಾ ವಿಳಾಸದ ಕಾಗುಣಿತ ತಿದ್ದುಪಡಿ.',
    category: 'Civil Registration',
    badgeEn: 'Karnataka RBD Rules (Rule 11)',
    badgeKn: 'ಕರ್ನಾಟಕ ಆರ್‌ಬಿಡಿ ನಿಯಮಗಳು (ನಿಯಮ 11)',
    iconName: 'Edit3',
    eligibilityEn: [
      'Original certificate was registered and issued by Kumbalgodu Gram Panchayat.',
      'Clerical or typographical error evidenced by pre-existing official documents (School TC, SSLC, Passport).'
    ],
    eligibilityKn: [
      'ಕುಂಬಳಗೋಡು ಗ್ರಾಮ ಪಂಚಾಯಿತಿಯಲ್ಲಿ ಮೂಲ ನೋಂದಣಿ ಆಗಿರುವ ಪ್ರಮಾಣಪತ್ರಗಳು.',
      'ಪೂರ್ವ ಅಸ್ತಿತ್ವದಲ್ಲಿರುವ ಅಧಿಕೃತ ದಾಖಲೆಗಳಿಂದ (ಎಸ್ಸೆಸ್ಸೆಲ್ಸಿ ಅಂಕಪಟ್ಟಿ, ಪಾಸ್‌ಪೋರ್ಟ್) ಸಾಬೀತಾಗುವ ತಪ್ಪುಗಳು.'
    ],
    requiredDocsEn: [
      { name: 'Original Mistaken Certificate', type: 'Original', description: 'The physically issued certificate requiring correction.' },
      { name: 'Corroborating School Records / SSLC Marks Card', type: 'Photocopy', description: 'Certified school records showing correct spelling of applicant/parents.' },
      { name: 'Parents Passport or Aadhaar', type: 'Photocopy', description: 'Photocopy of identity showing correct legal name.' },
      { name: 'Notarized Affidavit (Rule 11 Form)', type: 'Original', description: 'Affidavit executed before a First Class Magistrate or Notary Public stating facts.' }
    ],
    requiredDocsKn: [
      { name: 'ತಪ್ಪಾಗಿರುವ ಮೂಲ ಪ್ರಮಾಣಪತ್ರ', type: 'Original', description: 'ತಿದ್ದುಪಡಿ ಮಾಡಬೇಕಾದ ಹಿಂದೆ ನೀಡಿದ ಮೂಲ ಪ್ರಮಾಣಪತ್ರ.' },
      { name: 'ಶಾಲಾ ದಾಖಲೆ / ಎಸ್ಸೆಸ್ಸೆಲ್ಸಿ ಅಂಕಪಟ್ಟಿ', type: 'Photocopy', description: 'ಸರಿಯಾದ ಹೆಸರನ್ನು ತೋರಿಸುವ ಪ್ರಮಾಣೀಕೃತ ಶಾಲಾ ದಾಖಲೆ.' },
      { name: 'ಪೋಷಕರ ಪಾಸ್‌ಪೋರ್ಟ್ ಅಥವಾ ಆಧಾರ್ ಕಾರ್ಡ್', type: 'Photocopy', description: 'ಕಾನೂನುಬದ್ಧ ಸರಿಯಾದ ಹೆಸರಿರುವ ದಾಖಲೆ.' },
      { name: 'ನೋಟರಿ ಪ್ರಮಾಣಪತ್ರ (ನಿಯಮ 11 ರಂತೆ)', type: 'Original', description: 'ವಿಷಯದ ನೈಜತೆಯನ್ನು ತಿಳಿಸುವ ನೋಟರಿ ಅಫಿಡವಿಟ್.' }
    ],
    guidanceEn: [
      'Registrar may make marginal corrections under Section 15 of RBD Act without erasing the original entry.',
      'Complex name changes (beyond clerical errors) require official Karnataka State Gazette notification.'
    ],
    guidanceKn: [
      'ಮೂಲ ನಮೂದನ್ನು ಅಳಿಸದೆ ಕಾಯ್ದೆಯ ಸೆಕ್ಷನ್ 15 ರ ಅಡಿಯಲ್ಲಿ ಅಂಚಿನಲ್ಲಿ ತಿದ್ದುಪಡಿ ಮಾಡಲಾಗುತ್ತದೆ.',
      'ಸಂಪೂರ್ಣ ಹೆಸರು ಬದಲಾವಣೆಗೆ ಕರ್ನಾಟಕ ರಾಜ್ಯ ಅಧಿಕೃತ ಗೆಜೆಟ್ ಅಧಿಸೂಚನೆ ಅಗತ್ಯವಿರುತ್ತದೆ.'
    ],
    officialForms: ['Application for Correction under Rule 11', 'Model Sworn Affidavit'],
    statutoryFeeEn: 'Nominal correction fee as per Karnataka Government notification.',
    statutoryFeeKn: 'ಕರ್ನಾಟಕ ಸರ್ಕಾರದ ಅಧಿಸೂಚನೆಯಂತೆ ನಿಗದಿತ ಶುಲ್ಕ.',
    timeframeEn: '7 to 14 working days (requires local inquiry)',
    timeframeKn: '7 ರಿಂದ 14 ಕೆಲಸದ ದಿನಗಳು (ಸ್ಥಳೀಯ ತನಿಖೆ ಅಗತ್ಯ)',
    counterEn: 'Counter 3 (Grievances & Scrutiny)',
    counterKn: 'ಕೌಂಟರ್ 3 (ಕುಂದುಕೊರತೆ ಮತ್ತು ಪರಿಶೀಲನೆ)'
  },
  {
    id: 'local-admin',
    titleEn: 'Local Administrative Services',
    titleKn: 'ಸ್ಥಳೀಯ ಆಡಳಿತಾತ್ಮಕ ಸೇವೆಗಳು',
    shortDescEn: 'E-Swathu guidance, Form 9 and Form 11A property extract verification, property tax assessment, and mutation assistance.',
    shortDescKn: 'ಈ-ಸ್ವತ್ತು ಮಾರ್ಗದರ್ಶನ, ನಮೂನೆ 9 ಮತ್ತು 11ಎ ಆಸ್ತಿ ದಾಖಲೆಗಳು, ಆಸ್ತಿ ತೆರಿಗೆ ಮೌಲ್ಯಮಾಪನ ಮತ್ತು ಖಾತಾ ಬದಲಾವಣೆ.',
    category: 'Revenue & Land',
    badgeEn: 'Karnataka Panchayat Raj Act 1993 / E-Swathu',
    badgeKn: 'ಕರ್ನಾಟಕ ಪಂಚಾಯತ್ ರಾಜ್ ಕಾಯ್ದೆ 1993 / ಈ-ಸ್ವತ್ತು',
    iconName: 'Building2',
    eligibilityEn: [
      'Property owners possessing non-agricultural residential/commercial sites in Kumbalgodu Gram Panchayat limits.',
      'Properties possessing approved layout plan by BDA/BMRDA or recognized gramathana / revenue land with valid DC conversion.'
    ],
    eligibilityKn: [
      'ಕುಂಬಳಗೋಡು ಗ್ರಾಮ ಪಂಚಾಯಿತಿ ವ್ಯಾಪ್ತಿಯಲ್ಲಿ ನಿವೇಶನ ಅಥವಾ ಕಟ್ಟಡ ಹೊಂದಿರುವ ಮಾಲೀಕರು.',
      'ಬಿಡಿಎ/ಬಿಎಂಆರ್‌ಡಿಎ ಅನುಮೋದಿತ ಬಡಾವಣೆಗಳು ಅಥವಾ ಡಿಸಿ ಕನ್ವರ್ಷನ್ ಹೊಂದಿರುವ ಅಧಿಕೃತ ಜಮೀನುಗಳು.'
    ],
    requiredDocsEn: [
      { name: 'Registered Sale Deed / Title Deed', type: 'Photocopy', description: 'Complete registered conveyance deed with Sub-Registrar seal.' },
      { name: 'Previous Year Property Tax Receipt', type: 'Photocopy', description: 'Latest paid tax receipt issued by Kumbalgodu Gram Panchayat.' },
      { name: 'Encumbrance Certificate (EC Form 15)', type: 'Original', description: 'Updated EC for last 15 years from Sub-Registrar office.' },
      { name: 'Owner Aadhaar & PAN Card', type: 'Photocopy', description: 'Identity and PAN proof of registered owner.' },
      { name: 'Site Photo with GPS Coordinates / Survey Map', type: 'Either', description: 'Photograph of the property showing boundary demarcation.' }
    ],
    requiredDocsKn: [
      { name: 'ನೋಂದಾಯಿತ ಕ್ರಯಪತ್ರ (ಸೇಲ್ ಡೀಡ್)', type: 'Photocopy', description: 'ಉಪ-ನೋಂದಣಾಧಿಕಾರಿಗಳ ಕಚೇರಿಯ ಅಧಿಕೃತ ಕ್ರಯಪತ್ರದ ಪ್ರತಿ.' },
      { name: 'ಹಿಂದಿನ ಸಾಲಿನ ಆಸ್ತಿ ತೆರಿಗೆ ರಶೀದಿ', type: 'Photocopy', description: 'ಕುಂಬಳಗೋಡು ಪಂಚಾಯಿತಿಗೆ ಪಾವತಿಸಿದ ಇತ್ತೀಚಿನ ತೆರಿಗೆ ರಶೀದಿ.' },
      { name: 'ಋಣಭಾರ ಪ್ರಮಾಣಪತ್ರ (ಇಸಿ ನಮೂನೆ 15)', type: 'Original', description: 'ಕಳೆದ 15 ವರ್ಷಗಳ ಇತ್ತೀಚಿನ ಎನ್‌ಕಂಬರೆನ್ಸ್ ಸರ್ಟಿಫಿಕೇಟ್.' },
      { name: 'ಮಾಲೀಕರ ಆಧಾರ್ ಮತ್ತು ಪ್ಯಾನ್ ಕಾರ್ಡ್', type: 'Photocopy', description: 'ಮಾಲೀಕರ ಗುರುತಿನ ಮತ್ತು ಆದಾಯ ತೆರಿಗೆ ಪುರಾವೆ.' },
      { name: 'ಜಿಪಿಎಸ್ ಫೋಟೋ ಮತ್ತು ನಿವೇಶನ ನಕ್ಷೆ', type: 'Either', description: 'ಆಸ್ತಿಯ ಗಡಿ ಗುರುತುಗಳನ್ನು ತೋರಿಸುವ ಛಾಯಾಚಿತ್ರ.' }
    ],
    guidanceEn: [
      'All property records are processed through the state E-Swathu portal to prevent unauthorized khata creation.',
      'Field inspection is conducted by Panchayat Development Officer (PDO) or Technical Assistant prior to Form 9/11A generation.',
      'Appointments can be booked to meet the Revenue Clerk for preliminary document verification before portal upload.'
    ],
    guidanceKn: [
      'ಅನಧಿಕೃತ ಖಾತಾ ತಡೆಗಟ್ಟಲು ಎಲ್ಲಾ ಆಸ್ತಿ ದಾಖಲೆಗಳನ್ನು ಈ-ಸ್ವತ್ತು ಪೋರ್ಟಲ್ ಮೂಲಕವೇ ಪ್ರಕ್ರಿಯೆಗೊಳಿಸಲಾಗುತ್ತದೆ.',
      'ನಮೂನೆ 9/11ಎ ನೀಡುವ ಮೊದಲು ಪಿಡಿಒ ಅಥವಾ ತಾಂತ್ರಿಕ ಸಹಾಯಕರ ಸ್ಥಳ ಪರಿಶೀಲನೆ ಕಡ್ಡಾಯವಾಗಿರುತ್ತದೆ.',
      'ದಾಖಲೆಗಳ ಪೂರ್ವ ಪರಿಶೀಲನೆಗಾಗಿ ಪಂಚಾಯಿತಿ ಕಂದಾಯ ಅಧಿಕಾರಿಯನ್ನು ಭೇಟಿ ಮಾಡಲು ಅಪಾಯಿಂಟ್‌ಮೆಂಟ್ ಬುಕ್ ಮಾಡಬಹುದು.'
    ],
    officialForms: ['E-Swathu Application Checklist', 'Self-Assessment Property Tax Form'],
    statutoryFeeEn: 'Statutory property tax and E-Swathu processing fees as per government rates.',
    statutoryFeeKn: 'ಸರ್ಕಾರಿ ದರದಂತೆ ನಿಗದಿತ ಆಸ್ತಿ ತೆರಿಗೆ ಮತ್ತು ಈ-ಸ್ವತ್ತು ಶುಲ್ಕ.',
    timeframeEn: '15 to 30 working days subject to spot inspection',
    timeframeKn: 'ಸ್ಥಳ ತಪಾಸಣೆಗೊಳಪಟ್ಟು 15 ರಿಂದ 30 ಕೆಲಸದ ದಿನಗಳು',
    counterEn: 'Counter 2 (E-Swathu & Property Tax Desk)',
    counterKn: 'ಕೌಂಟರ್ 2 (ಈ-ಸ್ವತ್ತು ಮತ್ತು ಆಸ್ತಿ ತೆರಿಗೆ ವಿಭಾಗ)'
  },
  {
    id: 'panchayat-docs',
    titleEn: 'Panchayat Documentation Support',
    titleKn: 'ಪಂಚಾಯತ್ ದಾಖಲಾತಿ ಬೆಂಬಲ',
    shortDescEn: 'No Objection Certificates (NOC) for BESCOM electricity, BWSSB/drinking water, trade licenses, and building plan guidance.',
    shortDescKn: 'ಬೆಸ್ಕಾಂ ವಿದ್ಯುತ್, ಕುಡಿಯುವ ನೀರು ಸಂಪರ್ಕಕ್ಕೆ ನಿರಾಕ್ಷೇಪಣಾ ಪತ್ರ (ಎನ್‌ಒಸಿ), ವ್ಯಾಪಾರ ಪರವಾನಗಿ ಮತ್ತು ಕಟ್ಟಡ ನಕ್ಷೆ ಮಾರ್ಗದರ್ಶನ.',
    category: 'Licenses & NOC',
    badgeEn: 'Karnataka Panchayat Raj Rules',
    badgeKn: 'ಕರ್ನಾಟಕ ಪಂಚಾಯತ್ ರಾಜ್ ನಿಯಮಗಳು',
    iconName: 'ShieldCheck',
    eligibilityEn: [
      'Resident or business proprietor within Kumbalgodu Panchayat limits.',
      'No pending property tax arrears for the subject premises.'
    ],
    eligibilityKn: [
      'ಕುಂಬಳಗೋಡು ಪಂಚಾಯಿತಿ ವ್ಯಾಪ್ತಿಯ ನಿವಾಸಿ ಅಥವಾ ಉದ್ಯಮ ಮಾಲೀಕರು.',
      'ಸಂಬಂಧಿತ ಆಸ್ತಿಗೆ ಯಾವುದೇ ತೆರಿಗೆ ಬಾಕಿ ಇರಬಾರದು.'
    ],
    requiredDocsEn: [
      { name: 'Application in Prescribed Format', type: 'Original', description: 'Duly filled Panchayat NOC/License application form.' },
      { name: 'Proof of Title / Lease Agreement', type: 'Photocopy', description: 'Registered lease agreement or ownership deed.' },
      { name: 'Latest Tax Paid Receipt', type: 'Photocopy', description: 'Zero arrears receipt of Kumbalgodu Gram Panchayat.' },
      { name: 'ID Proof of Applicant', type: 'Photocopy', description: 'Aadhaar / Voter ID of the applicant/proprietor.' },
      { name: 'Fire Safety / Pollution Consent (for commercial/industrial)', type: 'Photocopy', description: 'KSPCB or Fire Dept NOC for industrial units in Kumbalgodu Industrial Area.' }
    ],
    requiredDocsKn: [
      { name: 'ನಿಗದಿತ ನಮೂನೆಯಲ್ಲಿ ಅರ್ಜಿ', type: 'Original', description: 'ಸಂಪೂರ್ಣ ಭರ್ತಿ ಮಾಡಿದ ಪಂಚಾಯಿತಿ ಎನ್‌ಒಸಿ ಅರ್ಜಿ.' },
      { name: 'ಮಾಲೀಕತ್ವದ ದಾಖಲೆ ಅಥವಾ ಬಾಡಿಗೆ ಒಪ್ಪಂದ', type: 'Photocopy', description: 'ನೋಂದಾಯಿತ ಬಾಡಿಗೆ ಕರಾರು ಅಥವಾ ಹಕ್ಕುಪತ್ರ.' },
      { name: 'ಇತ್ತೀಚಿನ ತೆರಿಗೆ ಪಾವತಿ ರಶೀದಿ', type: 'Photocopy', description: 'ಯಾವುದೇ ತೆರಿಗೆ ಬಾಕಿ ಇಲ್ಲದ ಕುಂಬಳಗೋಡು ಪಂಚಾಯಿತಿ ರಶೀದಿ.' },
      { name: 'ಅರ್ಜಿದಾರರ ಗುರುತಿನ ಚೀಟಿ', type: 'Photocopy', description: 'ಅರ್ಜಿದಾರರ ಅಥವಾ ಮಾಲೀಕರ ಆಧಾರ್ ಕಾರ್ಡ್.' },
      { name: 'ಮಾಲಿನ್ಯ ನಿಯಂತ್ರಣ ಮಂಡಳಿ ಪತ್ರ (ಕೈಗಾರಿಕೆಗಳಿಗೆ)', type: 'Photocopy', description: 'ಕುಂಬಳಗೋಡು ಕೈಗಾರಿಕಾ ಪ್ರದೇಶದ ಕಾರ್ಖಾನೆಗಳಿಗೆ ಅಗತ್ಯ ದಾಖಲೆಗಳು.' }
    ],
    guidanceEn: [
      'NOC applications are reviewed during the weekly administrative sitting.',
      'Premises inspection by Junior Engineer / PDO is required before issuing building plan approval.',
      'Trade licenses require annual renewal before March 31st.'
    ],
    guidanceKn: [
      'ಎನ್‌ಒಸಿ ಅರ್ಜಿಗಳನ್ನು ವಾರದ ಆಡಳಿತಾತ್ಮಕ ಸಭೆಯಲ್ಲಿ ಪರಿಶೀಲಿಸಲಾಗುತ್ತದೆ.',
      'ಕಟ್ಟಡ ಅನುಮೋದನೆ ನೀಡುವ ಮುನ್ನ ಕಿರಿಯ ಇಂಜಿನಿಯರ್ ಅಥವಾ ಪಿಡಿಒ ಸ್ಥಳ ಪರಿಶೀಲನೆ ಮಾಡುತ್ತಾರೆ.',
      'ವ್ಯಾಪಾರ ಪರವಾನಗಿಗಳನ್ನು ಪ್ರತಿ ವರ್ಷ ಮಾರ್ಚ್ 31 ರೊಳಗೆ ನವೀಕರಿಸಬೇಕು.'
    ],
    officialForms: ['Form A: Application for Electricity NOC', 'Form B: Trade License Application'],
    statutoryFeeEn: 'Prescribed fee as resolved by Kumbalgodu Gram Panchayat Council.',
    statutoryFeeKn: 'ಕುಂಬಳಗೋಡು ಗ್ರಾಮ ಪಂಚಾಯಿತಿ ಸಭೆ ನಿರ್ಣಯಿಸಿದ ನಿಗದಿತ ಶುಲ್ಕ.',
    timeframeEn: '7 to 10 working days',
    timeframeKn: '7 ರಿಂದ 10 ಕೆಲಸದ ದಿನಗಳು',
    counterEn: 'Counter 4 (Licensing & Engineering)',
    counterKn: 'ಕೌಂಟರ್ 4 (ಪರವಾನಗಿ ಮತ್ತು ಎಂಜಿನಿಯರಿಂಗ್ ವಿಭಾಗ)'
  },
  {
    id: 'general-civic',
    titleEn: 'General Civic Enquiries & Grievances',
    titleKn: 'ಸಾಮಾನ್ಯ ನಾಗರಿಕ ವಿಚಾರಣೆ ಮತ್ತು ಕುಂದುಕೊರತೆ',
    shortDescEn: 'Public drinking water supply issues, streetlights maintenance, drain desilting, road repairs, and general administrative inquiries.',
    shortDescKn: 'ಕುಡಿಯುವ ನೀರಿನ ಪೂರೈಕೆ, ಬೀದಿ ದೀಪ ದುರಸ್ತಿ, ಚರಂಡಿ ಸ್ವಚ್ಛತೆ, ರಸ್ತೆ ದುರಸ್ತಿ ಮತ್ತು ಸಾರ್ವಜನಿಕ ಕುಂದುಕೊರತೆಗಳು.',
    category: 'Civic Amenities',
    badgeEn: 'Citizen Charter / Janasnehi',
    badgeKn: 'ನಾಗರಿಕ ಸನ್ನದು / ಜನಸ್ನೇಹಿ',
    iconName: 'HelpCircle',
    eligibilityEn: [
      'Any bona fide resident, commuter, or civic group within Kumbalgodu Gram Panchayat territory.',
      'Grievances must pertain to local panchayat amenities and public services.'
    ],
    eligibilityKn: [
      'ಕುಂಬಳಗೋಡು ಗ್ರಾಮ ಪಂಚಾಯಿತಿ ವ್ಯಾಪ್ತಿಯ ಯಾವುದೇ ನಾಗರಿಕರು ಅಥವಾ ಸಂಘಟನೆಗಳು.',
      'ದೂರುಗಳು ಸ್ಥಳೀಯ ಪಂಚಾಯಿತಿ ನಾಗರಿಕ ಸೌಲಭ್ಯಗಳಿಗೆ ಸಂಬಂಧಿಸಿರಬೇಕು.'
    ],
    requiredDocsEn: [
      { name: 'Written Grievance Application / Online Reference', type: 'Either', description: 'Brief statement describing the location and nature of public issue.' },
      { name: 'Applicant Contact Mobile Number', type: 'Either', description: 'Valid number for SMS status updates and field inspection coordination.' },
      { name: 'Photographs of Issue (Optional)', type: 'Photocopy', description: 'Site photograph of broken pipe, streetlight or pothole.' }
    ],
    requiredDocsKn: [
      { name: 'ಲಿಖಿತ ದೂರು ಅರ್ಜಿ / ಆನ್‌ಲೈನ್ ದಾಖಲೆ', type: 'Either', description: 'ಸಮಸ್ಯೆಯ ಸ್ಥಳ ಮತ್ತು ವಿವರವನ್ನು ತಿಳಿಸುವ ಅರ್ಜಿ.' },
      { name: 'ಅರ್ಜಿದಾರರ ಮೊಬೈಲ್ ಸಂಖ್ಯೆ', type: 'Either', description: 'ಅಧಿಕಾರಿಗಳ ಸಂಪರ್ಕ ಮತ್ತು ಪ್ರಗತಿ ತಿಳಿಯಲು ಚಾಲ್ತಿಯಲ್ಲಿರುವ ನಂಬರ್.' },
      { name: 'ಸ್ಥಳದ ಫೋಟೋ (ಐಚ್ಛಿಕ)', type: 'Photocopy', description: 'ಹಾಳಾದ ಬೀದಿದೀಪ, ಪೈಪ್‌ಲೈನ್ ಅಥವಾ ಚರಂಡಿಯ ಫೋಟೋ.' }
    ],
    guidanceEn: [
      'Drinking water and emergency pipeline bursts are addressed within 24 to 48 hours.',
      'Streetlight failures are rectified during the weekly electrical maintenance cycle.',
      'Citizens can track complaint status using their unique reference number on this portal.'
    ],
    guidanceKn: [
      'ಕುಡಿಯುವ ನೀರು ಮತ್ತು ತುರ್ತು ಪೈಪ್ ಒಡೆದ ಸಮಸ್ಯೆಗಳನ್ನು 24 ರಿಂದ 48 ಗಂಟೆಗಳ ಒಳಗೆ ಪರಿಹರಿಸಲಾಗುತ್ತದೆ.',
      'ಬೀದಿದೀಪ ದುರಸ್ತಿಗಳನ್ನು ವಾರದ ನಿರ್ವಹಣಾ ಸಮಯದಲ್ಲಿ ಸರಿಪಡಿಸಲಾಗುತ್ತದೆ.',
      'ಈ ಪೋರ್ಟಲ್‌ನಲ್ಲಿ ನೀಡಲಾದ ರೆಫರೆನ್ಸ್ ಸಂಖ್ಯೆಯ ಮೂಲಕ ದೂರನ್ನು ಟ್ರ್ಯಾಕ್ ಮಾಡಬಹುದು.'
    ],
    officialForms: ['Citizen Grievance Redressal Slip'],
    statutoryFeeEn: 'Free of Cost (Zero Fee Service)',
    statutoryFeeKn: 'ಸಂಪೂರ್ಣ ಉಚಿತ (ಯಾವುದೇ ಶುಲ್ಕವಿಲ್ಲ)',
    timeframeEn: '24 hours to 7 days depending on emergency nature',
    timeframeKn: 'ತುರ್ತು ಪರಿಸ್ಥಿತಿಗೆ ಅನುಗುಣವಾಗಿ 24 ಗಂಟೆಯಿಂದ 7 ದಿನಗಳು',
    counterEn: 'Counter 3 / PDO Citizen Helpdesk',
    counterKn: 'ಕೌಂಟರ್ 3 / ಪಿಡಿಒ ನಾಗರಿಕ ಸಹಾಯವಾಣಿ'
  }
];

export const OFFICIAL_DOWNLOADABLE_FORMS = [
  {
    id: 'form-1-birth',
    titleEn: 'Form 1: Birth Reporting & Registration Form',
    titleKn: 'ನಮೂನೆ 1: ಜನನ ವರದಿ ಮತ್ತು ನೋಂದಣಿ ಅರ್ಜಿ',
    category: 'Civil Registration',
    department: 'Karnataka Directorate of Economics & Statistics / RBD',
    format: 'PDF Printable Format',
    fileSize: '145 KB',
    descriptionEn: 'Official prescribed form for intimating institutional or domestic birth within Kumbalgodu Panchayat.'
  },
  {
    id: 'form-2-death',
    titleEn: 'Form 2: Death Reporting & Intimation Form',
    titleKn: 'ನಮೂನೆ 2: ಮರಣ ವರದಿ ಮತ್ತು ಮಾಹಿತಿ ಅರ್ಜಿ',
    category: 'Civil Registration',
    department: 'Karnataka Directorate of Economics & Statistics / RBD',
    format: 'PDF Printable Format',
    fileSize: '138 KB',
    descriptionEn: 'Statutory form for reporting demise and obtaining death registration acknowledgment.'
  },
  {
    id: 'form-eswathu-9-11',
    titleEn: 'Form 9 & 11A E-Swathu Scrutiny Checklist',
    titleKn: 'ನಮೂನೆ 9 ಮತ್ತು 11ಎ ಈ-ಸ್ವತ್ತು ಪರಿಶೀಲನಾ ಪಟ್ಟಿ',
    category: 'Revenue & Land',
    department: 'RDPR Department, Govt of Karnataka',
    format: 'PDF Printable Format',
    fileSize: '210 KB',
    descriptionEn: 'Official document verification checklist required prior to E-Swathu khata registration and mutation.'
  },
  {
    id: 'form-noc-electricity',
    titleEn: 'Application for BESCOM Electricity NOC',
    titleKn: 'ಬೆಸ್ಕಾಂ ವಿದ್ಯುತ್ ಸಂಪರ್ಕಕ್ಕೆ ಪಂಚಾಯಿತಿ ಎನ್‌ಒಸಿ ಅರ್ಜಿ',
    category: 'Licenses & NOC',
    department: 'Gram Panchayat Kumbalgodu Engineering Cell',
    format: 'PDF Printable Format',
    fileSize: '120 KB',
    descriptionEn: 'Format to request Gram Panchayat No Objection Certificate for fresh power meter installation.'
  },
  {
    id: 'form-trade-license',
    titleEn: 'Panchayat Trade License Application Form',
    titleKn: 'ಗ್ರಾಮ ಪಂಚಾಯಿತಿ ವ್ಯಾಪಾರ ಪರವಾನಗಿ ಅರ್ಜಿ',
    category: 'Licenses & NOC',
    department: 'Kumbalgodu Health & Sanitation Section',
    format: 'PDF Printable Format',
    fileSize: '175 KB',
    descriptionEn: 'Application for new trade license or annual renewal for shops, clinics, warehouses, and commercial units.'
  },
  {
    id: 'form-grievance',
    titleEn: 'Citizen Grievance & Public Redressal Form',
    titleKn: 'ಸಾರ್ವಜನಿಕ ಕುಂದುಕೊರತೆ ನಿವಾರಣಾ ಅರ್ಜಿ',
    category: 'Civic Amenities',
    department: 'Panchayat Development Officer Desk',
    format: 'PDF Printable Format',
    fileSize: '95 KB',
    descriptionEn: 'Standard public redressal format for sanitation, streetlights, water supply, and encroachment concerns.'
  }
];

export const FREQUENTLY_ASKED_QUESTIONS = [
  {
    qEn: 'Is an online appointment booking guaranteed confirmation for an immediate visit?',
    qKn: 'ಆನ್‌ಲೈನ್ ಅಪಾಯಿಂಟ್‌ಮೆಂಟ್ ಬುಕ್ ಮಾಡಿದ ತಕ್ಷಣ ಭೇಟಿ ದೃಢೀಕರಣವಾಗುತ್ತದೆಯೇ?',
    aEn: 'No. An online appointment request is an administrative booking inquiry. It will be scrutinized by the designated Panchayat Officer, who will verify slot availability and confirm the designated time via SMS or on this portal. Always check your tracking status before visiting.',
    aKn: 'ಇಲ್ಲ. ಆನ್‌ಲೈನ್ ಅಪಾಯಿಂಟ್‌ಮೆಂಟ್ ವಿನಂತಿಯು ಪೂರ್ವಭಾವಿ ವಿನಂತಿಯಾಗಿರುತ್ತದೆ. ಕಚೇರಿಯ ಅಧಿಕಾರಿಗಳು ಪರಿಶೀಲಿಸಿ ಸಮಯ ನಿಗದಿಪಡಿಸುತ್ತಾರೆ. ಭೇಟಿ ನೀಡುವ ಮುನ್ನ ನಿಮ್ಮ ರೆಫರೆನ್ಸ್ ಸಂಖ್ಯೆಯ ಮೂಲಕ ಸ್ಥಿತಿಯನ್ನು ಪರಿಶೀಲಿಸಿ.'
  },
  {
    qEn: 'What are the official working hours of Kumbalgodu Gram Panchayat Office?',
    qKn: 'ಕುಂಬಳಗೋಡು ಗ್ರಾಮ ಪಂಚಾಯಿತಿ ಕಚೇರಿಯ ಕೆಲಸದ ಸಮಯ ಯಾವುದು?',
    aEn: 'Monday to Saturday, 10:00 AM to 5:00 PM. Lunch break is observed between 1:30 PM and 2:15 PM. The office is closed on Sundays and Karnataka State Government gazetted public holidays (All hours are subject to official administrative confirmation).',
    aKn: 'ಸೋಮವಾರದಿಂದ ಶನಿವಾರದವರೆಗೆ, ಬೆಳಿಗ್ಗೆ 10:00 ರಿಂದ ಸಂಜೆ 5:00 ರವರೆಗೆ. ಮಧ್ಯಾಹ್ನ 1:30 ರಿಂದ 2:15 ರವರೆಗೆ ಭೋಜನ ವಿರಾಮ. ಭಾನುವಾರ ಮತ್ತು ಸರ್ಕಾರಿ ರಜಾದಿನಗಳಲ್ಲಿ ಕಚೇರಿ ಮುಚ್ಚಿರುತ್ತದೆ.'
  },
  {
    qEn: 'Do I need to bring original documents for certificate services?',
    qKn: 'ಪ್ರಮಾಣಪತ್ರ ಸೇವೆಗಳಿಗೆ ಮೂಲ ದಾಖಲೆಗಳನ್ನು ತರಬೇಕೆ?',
    aEn: 'Yes. While photocopies are retained for office records, physical inspection of original documents (e.g., Hospital slips, School marks cards, Aadhaar cards, Registered Sale Deeds) is mandatory by law before any certificate or extract is authorized.',
    aKn: 'ಹೌದು. ಕಚೇರಿಯ ಕಡತಕ್ಕೆ ಜೆರಾಕ್ಸ್ ಪ್ರತಿಗಳನ್ನು ಇಟ್ಟುಕೊಂಡರೂ, ಯಾವುದೇ ಪ್ರಮಾಣಪತ್ರ ನೀಡುವ ಮುನ್ನ ಮೂಲ ದಾಖಲೆಗಳ ಭೌತಿಕ ಪರಿಶೀಲನೆ ಕಡ್ಡಾಯವಾಗಿರುತ್ತದೆ.'
  },
  {
    qEn: 'How can I track my submitted enquiry or appointment request?',
    qKn: 'ನಾನು ಸಲ್ಲಿಸಿದ ವಿನಂತಿ ಅಥವಾ ದೂರಿನ ಸ್ಥಿತಿಯನ್ನು ಹೇಗೆ ತಿಳಿಯುವುದು?',
    aEn: 'You can use the "Track Application" section on this portal. Enter your unique Reference Number (e.g., KP-2026-1042 or ENQ-2026-8819) or registered 10-digit mobile number to view real-time stage progression and official remarks.',
    aKn: 'ಈ ಪೋರ್ಟಲ್‌ನಲ್ಲಿರುವ "ಸ್ಥಿತಿ ಪರಿಶೀಲನೆ" ವಿಭಾಗವನ್ನು ಬಳಸಿ. ನಿಮ್ಮ ರೆಫರೆನ್ಸ್ ಸಂಖ್ಯೆ (ಉದಾ: KP-2026-1042) ಅಥವಾ ಮೊಬೈಲ್ ಸಂಖ್ಯೆಯನ್ನು ನಮೂದಿಸಿ ಪ್ರಸ್ತುತ ಹಂತ ಮತ್ತು ಅಧಿಕೃತ ಟಿಪ್ಪಣಿಗಳನ್ನು ಪರಿಶೀಲಿಸಬಹುದು.'
  },
  {
    qEn: 'Can I pay property tax directly at the Gram Panchayat office?',
    qKn: 'ಗ್ರಾಮ ಪಂಚಾಯಿತಿ ಕಚೇರಿಯಲ್ಲಿ ನೇರವಾಗಿ ಆಸ್ತಿ ತೆರಿಗೆ ಪಾವತಿಸಬಹುದೇ?',
    aEn: 'Yes. Property owners can visit Counter 2 with their previous tax receipt or E-Swathu document to verify dues and make payments through cash, cheque/demand draft, or digital payment pos facilities.',
    aKn: 'ಹೌದು. ಆಸ್ತಿ ಮಾಲೀಕರು ಹಿಂದಿನ ತೆರಿಗೆ ರಶೀದಿ ಅಥವಾ ಈ-ಸ್ವತ್ತು ಪ್ರತಿಯೊಂದಿಗೆ ಕೌಂಟರ್ 2 ಗೆ ಭೇಟಿ ನೀಡಿ ತೆರಿಗೆ ಪಾವತಿಸಬಹುದು.'
  }
];
