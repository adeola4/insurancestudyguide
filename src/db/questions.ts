import type { Question } from '../types'

export const STATES = [
  'Alabama','Alaska','Arizona','Arkansas','California','Colorado','Connecticut','Delaware',
  'District of Columbia','Florida','Georgia','Hawaii','Idaho','Illinois','Indiana','Iowa',
  'Kansas','Kentucky','Louisiana','Maine','Maryland','Massachusetts','Michigan','Minnesota',
  'Mississippi','Missouri','Montana','Nebraska','Nevada','New Hampshire','New Jersey',
  'New Mexico','New York','North Carolina','North Dakota','Ohio','Oklahoma','Oregon',
  'Pennsylvania','Rhode Island','South Carolina','South Dakota','Tennessee','Texas','Utah',
  'Vermont','Virginia','Washington','West Virginia','Wisconsin','Wyoming'
] as const

export const LICENSE_TYPES = ['Life','Health','Life & Health'] as const

export const TOPICS = [
  'Life Insurance Basics',
  'Term vs Whole Life',
  'Policy Riders',
  'Annuities',
  'Tax Implications',
  'Ethics & Regulations',
  'Risk Management',
  'Underwriting',
  'Beneficiary Designations',
  'State Laws'
] as const

function q(id: string, state: string, topic: string, prompt: string, choices: string[], answer: number, explanation: string): Question {
  return {
    id, state, license_type: 'Life & Health', topic,
    question: prompt, choices, correct_index: answer,
    explanation, difficulty: 'medium', source: 'original'
  }
}

export const SEED_QUESTIONS: Question[] = [
  q('pa-1','Pennsylvania','Life Insurance Basics','What is the primary purpose of life insurance?',['To accumulate cash value','To provide financial protection after death','To reduce taxes','To fund retirement'],1,'Life insurance primarily provides a death benefit to beneficiaries.'),
  q('pa-2','Pennsylvania','Term vs Whole Life','Which policy provides coverage for a specific period?',['Whole Life','Term Life','Universal Life','Variable Life'],1,'Term life insurance covers a set period, e.g., 10/20 years.'),
  q('pa-3','Pennsylvania','Policy Riders','A waiver of premium rider does what?',['Increases death benefit','Waives premiums if disabled','Reduces cash value','Adds accidental death benefit'],1,'Waiver of premium waives required payments during disability.'),
  q('pa-4','Pennsylvania','Annuities','What is an immediate annuity?',['Deferred payout','Payments begin immediately','Tax-free growth','Variable interest'],1,'Immediate annuities start payments soon after premium.'),
  q('pa-5','Pennsylvania','Tax Implications','Life insurance death benefits are generally:',['Taxable to beneficiary','Tax-exempt to beneficiary','Deductible by policyholder','Subject to estate tax always'],1,'Death benefits are generally income tax-exempt to beneficiaries.'),
  q('pa-6','Pennsylvania','Ethics & Regulations','Which is a prohibited practice?',['Misrepresenting policy terms','Explaining policy benefits','Disclosing fees','Providing illustrations'],0,'Misrepresentation is a prohibited and unethical practice.'),
  q('pa-7','Pennsylvania','Risk Management','Risk transfer in insurance means:',['Avoiding risk','Shifting risk to insurer','Retaining risk','Reducing risk via controls'],1,'Insurance transfers risk from the insured to the insurer.'),
  q('pa-8','Pennsylvania','Underwriting','Which factor most affects life insurance rates?',['Favorite color','Age and health','Pet ownership','Car model'],1,'Underwriting rates are driven by age, health, and risk class.'),
  q('pa-9','Pennsylvania','Beneficiary Designations','A revocable beneficiary:',['Cannot be changed','Can be changed by owner','Gets paid last','Must be a spouse'],1,'Revocable beneficiaries can be changed by the policy owner.'),
  q('pa-10','Pennsylvania','State Laws','In Pennsylvania, which agency regulates insurance?',['FDA','PA Insurance Department','FTC','SEC'],1,'State insurance departments regulate insurance within each state.')
]
