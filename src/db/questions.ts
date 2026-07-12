import type { Question } from '../types'

export const STATES = [
    'Alabama','Alaska','Arizona','Arkansas','California','Colorado','Connecticut','Delaware',
    'District of Columbia','Florida','Georgia','Hawaii','Idaho','Illinois','Indiana','Iowa',
    'Kansas','Kentucky','Louisiana','Maine','Maryland','Massachusetts','Michigan','Minnesota',
    'Mississippi','Missouri','Montana','Nebraska','Nevada','New Hampshire','New Jersey','New Mexico',
    'New York','North Carolina','North Dakota','Ohio','Oklahoma','Oregon','Pennsylvania',
    'Rhode Island','South Carolina','South Dakota','Tennessee','Texas','Utah','Vermont',
    'Virginia','Washington','West Virginia','Wisconsin','Wyoming'
]

export const LICENSE_TYPES = ['Life', 'Health', 'Life & Health']

export const SEED_QUESTIONS: Question[] = [
  {
    id: 'q1',
    state: 'Pennsylvania',
    license_type: 'Life & Health',
    topic: 'Policy Provisions',
    difficulty: 'easy',
    question: 'In a life insurance policy, the clause that allows the insurer to void the policy if the applicant lied on the application is called:',
    choices: ['Entire Contract clause', 'Incontestability clause', 'Misstatement of Age provision', ' incontestability clause'],
    correct_index: 2,
    explanation: 'The misstatement of age provision allows adjustment of benefits or premiums if the applicant misstates age or other personal characteristics.'
  },
  {
    id: 'q2',
    state: 'Pennsylvania',
    license_type: 'Life & Health',
    topic: 'Riders',
    difficulty: 'easy',
    question: 'Which rider provides a portion of the death benefit to the insured if diagnosed with a terminal illness?',
    choices: ['Accelerated Death Benefit rider', 'Waiver of Premium rider', 'Guaranteed Insurability rider', 'Return of Premium rider'],
    correct_index: 0,
    explanation: 'An Accelerated Death Benefit (ADB) rider allows terminally ill insureds to receive a portion of the death benefit while still alive.'
  },
  {
    id: 'q3',
    state: 'California',
    license_type: 'Life & Health',
    topic: 'Taxation',
    difficulty: 'medium',
    question: 'Life insurance premiums are generally:',
    choices: ['Tax deductible for the insured', 'Not tax deductible for the insured', 'Taxable to the beneficiary', 'Subject to sales tax'],
    correct_index: 1,
    explanation: 'Premiums are usually paid with after-tax dollars and are not deductible on the insured’s personal tax return.'
  },
  {
    id: 'q4',
    state: 'New York',
    license_type: 'Life & Health',
    topic: 'Types of Insurance',
    difficulty: 'easy',
    question: 'Whole life insurance is best described as:',
    choices: ['Temporary coverage with no cash value', 'Permanent coverage with cash value', 'Coverage only for accidental death', 'A type of annuitization'],
    correct_index: 1,
    explanation: 'Whole life provides lifelong protection and builds guaranteed cash value over time.'
  },
  {
    id: 'q5',
    state: 'Florida',
    license_type: 'Life',
    topic: 'Underwriting',
    difficulty: 'medium',
    question: 'The process of evaluating an applicant’s risk to determine premium rates is called:',
    choices: ['Claim adjustment', 'Underwriting', 'Risk retention', 'Reinsurance'],
    correct_index: 1,
    explanation: 'Underwriting assesses applicant risk and classifies it for pricing and acceptance decisions.'
  }
]
