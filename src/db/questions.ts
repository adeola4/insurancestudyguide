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

// 'National' questions apply to every state's exam (federal + general principles).
export const NATIONAL = 'National'

export const SEED_QUESTIONS: Question[] = [
  // ---------- NATIONAL / GENERAL ----------
  {
    id: 'n1', state: NATIONAL, license_type: 'Life & Health', topic: 'Federal Regulation',
    difficulty: 'medium',
    question: 'Which federal law returned insurance regulation primarily to the states and limited federal antitrust oversight of insurance?',
    choices: ['McCarran-Ferguson Act', 'Gramm-Leach-Bliley Act', 'Dodd-Frank Act', 'ERISA'],
    correct_index: 0,
    explanation: 'The McCarran-Ferguson Act (1945) declares that state regulation of insurance is in the public interest, and federal antitrust laws apply to insurance only to the extent states do not regulate it.'
  },
  {
    id: 'n2', state: NATIONAL, license_type: 'Life & Health', topic: 'Federal Regulation',
    difficulty: 'medium',
    question: 'Which federal agency is the primary supervisor of interstate insurance matters and coordinates state regulators?',
    choices: ['SEC', 'NAIC', 'FINRA', 'FDIC'],
    correct_index: 1,
    explanation: 'The National Association of Insurance Commissioners (NAIC) is a standard-setting organization of state insurance commissioners; it drafts model laws but has no direct federal authority.'
  },
  {
    id: 'n3', state: NATIONAL, license_type: 'Life', topic: 'Life Policy Types',
    difficulty: 'easy',
    question: 'A life insurance policy that provides coverage for a specific period and has no cash value is called:',
    choices: ['Whole life', 'Term life', 'Universal life', 'Endowment'],
    correct_index: 1,
    explanation: 'Term life provides death benefit protection for a set period only and builds no cash value.'
  },
  {
    id: 'n4', state: NATIONAL, license_type: 'Life', topic: 'Life Policy Types',
    difficulty: 'easy',
    question: 'Permanent life insurance that combines a death benefit with a savings element that grows tax-deferred is:',
    choices: ['Term life', 'Credit life', 'Whole life', 'Accidental death'],
    correct_index: 2,
    explanation: 'Whole life is permanent coverage with a guaranteed cash value that grows tax-deferred over the life of the policy.'
  },
  {
    id: 'n5', state: NATIONAL, license_type: 'Life', topic: 'Policy Provisions',
    difficulty: 'easy',
    question: 'The clause that prevents the insurer from denying a claim after the policy has been in force for a set period (typically two years) is the:',
    choices: ['Grace period', 'Incontestability clause', 'Reinstatement clause', 'Suicide clause'],
    correct_index: 1,
    explanation: 'The incontestability clause bars the insurer from contesting the policy (except for nonpayment) after it has been in force, usually two years.'
  },
  {
    id: 'n6', state: NATIONAL, license_type: 'Life', topic: 'Policy Provisions',
    difficulty: 'easy',
    question: 'The standard period after a premium due date during which the policy remains in force is the:',
    choices: ['Reinstatement period', 'Grace period', 'Elimination period', 'Free-look period'],
    correct_index: 1,
    explanation: 'The grace period (usually 30 or 31 days) keeps coverage active even if payment is late.'
  },
  {
    id: 'n7', state: NATIONAL, license_type: 'Life', topic: 'Riders',
    difficulty: 'easy',
    question: 'Which rider waives premiums if the insured becomes totally disabled, keeping the policy in force?',
    choices: ['Accelerated Death Benefit rider', 'Waiver of Premium rider', 'Guaranteed Insurability rider', 'Cost of Living rider'],
    correct_index: 1,
    explanation: 'The Waiver of Premium rider suspends premium payments during a qualifying total disability.'
  },
  {
    id: 'n8', state: NATIONAL, license_type: 'Life & Health', topic: 'Annuities',
    difficulty: 'medium',
    question: 'An annuity that begins payments immediately after a single premium is the:',
    choices: ['Deferred annuity', 'Immediate annuity', 'Fixed annuity', 'Variable annuity'],
    correct_index: 1,
    explanation: 'An immediate annuity starts income payments right after purchase, typically funded by a lump sum.'
  },
  {
    id: 'n9', state: NATIONAL, license_type: 'Life & Health', topic: 'Annuities',
    difficulty: 'medium',
    question: 'During the accumulation phase of an annuity, the money grows:',
    choices: ['Taxable annually', 'Tax-deferred', 'Tax-free forever', 'At a guaranteed fixed rate only'],
    correct_index: 1,
    explanation: 'Earnings inside an annuity accumulate tax-deferred until withdrawn; ordinary income tax applies on withdrawal.'
  },
  {
    id: 'n10', state: NATIONAL, license_type: 'Health', topic: 'Health Insurance',
    difficulty: 'easy',
    question: 'A managed care plan that requires members to use a primary care physician and get referrals is a:',
    choices: ['PPO', 'HMO', 'Indemnity plan', 'Short-term plan'],
    correct_index: 1,
    explanation: 'HMOs use a primary care physician gatekeeper model; referrals are required to see specialists.'
  },
  {
    id: 'n11', state: NATIONAL, license_type: 'Health', topic: 'Health Insurance',
    difficulty: 'easy',
    question: 'A PPO differs from an HMO mainly because it:',
    choices: ['Has no network', 'Pays 100% of all claims', 'Allows out-of-network care at higher cost', 'Covers only hospitalization'],
    correct_index: 2,
    explanation: 'PPOs let members see out-of-network providers, usually at a higher out-of-pocket cost, and do not require referrals.'
  },
  {
    id: 'n12', state: NATIONAL, license_type: 'Health', topic: 'Government Programs',
    difficulty: 'medium',
    question: 'Which program provides health coverage for people age 65 and older, funded by payroll taxes?',
    choices: ['Medicaid', 'Medicare', 'CHIP', 'VA benefits'],
    correct_index: 1,
    explanation: 'Medicare is the federal health insurance program for those 65+ and certain disabled individuals, primarily funded through FICA payroll taxes.'
  },
  {
    id: 'n13', state: NATIONAL, license_type: 'Health', topic: 'Government Programs',
    difficulty: 'medium',
    question: 'Medicaid is primarily funded and administered by:',
    choices: ['The federal government alone', 'Private insurers', 'State and federal governments jointly', 'Employers'],
    correct_index: 2,
    explanation: 'Medicaid is a joint state-federal program; states administer it within federal guidelines and share costs with the federal government.'
  },
  {
    id: 'n14', state: NATIONAL, license_type: 'Health', topic: 'Disability',
    difficulty: 'medium',
    question: 'The time between the start of a disability and when benefits begin is the:',
    choices: ['Probation period', 'Elimination period', 'Grace period', 'Reinstatement period'],
    correct_index: 1,
    explanation: 'The elimination (waiting) period is the deducted time before disability income benefits are paid.'
  },
  {
    id: 'n15', state: NATIONAL, license_type: 'Life & Health', topic: 'Underwriting',
    difficulty: 'easy',
    question: 'The process of evaluating risk to classify and price an applicant is called:',
    choices: ['Claim adjustment', 'Underwriting', 'Actuarial review', 'Reinsurance'],
    correct_index: 1,
    explanation: 'Underwriting assesses risk and determines acceptability and premium class.'
  },
  {
    id: 'n16', state: NATIONAL, license_type: 'Life', topic: 'Taxation',
    difficulty: 'medium',
    question: 'For a personally owned life policy, death benefits paid to a named beneficiary are generally:',
    choices: ['Taxable as ordinary income', 'Subject to capital gains tax', 'Income-tax free', 'Always taxed to the estate'],
    correct_index: 2,
    explanation: 'Life insurance death proceeds paid to a named beneficiary are typically received income-tax free.'
  },
  {
    id: 'n17', state: NATIONAL, license_type: 'Life & Health', topic: 'Ethics',
    difficulty: 'medium',
    question: 'Replacing an existing policy primarily to earn a commission, without benefit to the client, is an example of:',
    choices: ['Twisting', 'Reinstatement', 'Conversion', 'Conservation'],
    correct_index: 0,
    explanation: 'Twisting is the unethical replacement of insurance for the agent’s benefit; replacement rules require disclosure and comparison.'
  },
  {
    id: 'n18', state: NATIONAL, license_type: 'Life', topic: 'Riders',
    difficulty: 'medium',
    question: 'A rider that lets the insured buy additional coverage at specified dates without proof of insurability is the:',
    choices: ['Accidental Death rider', 'Guaranteed Insurability rider', 'Spouse rider', 'Return of Premium rider'],
    correct_index: 1,
    explanation: 'The Guaranteed Insurability rider allows future purchases of coverage at set intervals without evidence of insurability.'
  },

  // ---------- PENNSYLVANIA ----------
  {
    id: 'pa1', state: 'Pennsylvania', license_type: 'Life & Health', topic: 'State Regulation',
    difficulty: 'medium',
    question: 'In Pennsylvania, the free-look period for a newly delivered life policy is at least:',
    choices: ['10 days', '15 days', '20 days', '30 days'],
    correct_index: 0,
    explanation: 'Pennsylvania grants a minimum 10-day free-look period during which the policyowner may return the policy for a full refund.'
  },
  {
    id: 'pa2', state: 'Pennsylvania', license_type: 'Life', topic: 'Policy Provisions',
    difficulty: 'easy',
    question: 'The clause that allows the insurer to void the policy if the applicant lied on the application is the:',
    choices: ['Entire Contract clause', 'Incontestability clause', 'Misstatement of Age provision', 'Grace period'],
    correct_index: 1,
    explanation: 'The incontestability clause limits the insurer’s ability to void the policy after the contestability period, protecting the insured’s beneficiaries.'
  },
  {
    id: 'pa3', state: 'Pennsylvania', license_type: 'Health', topic: 'Health Insurance',
    difficulty: 'medium',
    question: 'Pennsylvania law requires health insurers to offer continuation of coverage after a qualifying event for at least:',
    choices: ['18 months', '31 days', '90 days', '6 months'],
    correct_index: 0,
    explanation: 'Under state and federal continuation rules, eligible individuals may continue group health coverage for a defined period (commonly up to 18 months under COBRA-type provisions).'
  },
  {
    id: 'pa4', state: 'Pennsylvania', license_type: 'Life', topic: 'Riders',
    difficulty: 'easy',
    question: 'Which rider provides a portion of the death benefit to the insured if diagnosed with a terminal illness?',
    choices: ['Accelerated Death Benefit rider', 'Waiver of Premium rider', 'Guaranteed Insurability rider', 'Return of Premium rider'],
    correct_index: 0,
    explanation: 'An Accelerated Death Benefit (ADB) rider allows terminally ill insureds to receive a portion of the death benefit while still alive.'
  },
  {
    id: 'pa5', state: 'Pennsylvania', license_type: 'Life & Health', topic: 'Ethics',
    difficulty: 'medium',
    question: 'A Pennsylvania agent who misrepresents a policy’s terms to induce a sale may face:',
    choices: ['A bonus', 'License suspension or revocation', 'Automatic renewal', 'No consequence'],
    correct_index: 1,
    explanation: 'Misrepresentation is a violation that can result in fines, suspension, or revocation of the producer license.'
  },
  {
    id: 'pa6', state: 'Pennsylvania', license_type: 'Life', topic: 'Annuities',
    difficulty: 'medium',
    question: 'In Pennsylvania, variable annuity agents must hold which additional authority?',
    choices: ['Property license', 'Securities registration', 'Surplus lines', 'None'],
    correct_index: 1,
    explanation: 'Selling variable products requires both a life license and a securities registration because the values fluctuate with the market.'
  },

  // ---------- NEW YORK ----------
  {
    id: 'ny1', state: 'New York', license_type: 'Life', topic: 'Life Policy Types',
    difficulty: 'easy',
    question: 'Whole life insurance is best described as:',
    choices: ['Temporary coverage with no cash value', 'Permanent coverage with cash value', 'Coverage only for accidental death', 'A type of annuitization'],
    correct_index: 1,
    explanation: 'Whole life provides lifelong protection and builds guaranteed cash value over time.'
  },
  {
    id: 'ny2', state: 'New York', license_type: 'Life & Health', topic: 'State Regulation',
    difficulty: 'medium',
    question: 'New York is unique in having its own separate insurance department that also oversees:',
    choices: ['Banking only', 'Both insurance and banking', 'Securities only', 'Health only'],
    correct_index: 1,
    explanation: 'The New York Department of Financial Services (DFS) supervises both insurance and banking within the state.'
  },
  {
    id: 'ny3', state: 'New York', license_type: 'Life', topic: 'Policy Provisions',
    difficulty: 'medium',
    question: 'New York requires a life settlement broker to act in the best interest of the:',
    choices: ['Insurer', 'Policyowner', 'Reinsurer', 'State'],
    correct_index: 1,
    explanation: 'Life settlement regulations require brokers to represent and act in the best interest of the policyowner (viator).'
  },
  {
    id: 'ny4', state: 'New York', license_type: 'Health', topic: 'Health Insurance',
    difficulty: 'medium',
    question: 'New York is a guaranteed-issue state for individual health coverage, meaning insurers:',
    choices: ['May deny based on health', 'Must accept all applicants regardless of health', 'Only cover employers', 'Require a waiting period'],
    correct_index: 1,
    explanation: 'New York mandates guaranteed issue for individual market plans; insurers cannot decline coverage based on health status.'
  },
  {
    id: 'ny5', state: 'New York', license_type: 'Life', topic: 'Underwriting',
    difficulty: 'easy',
    question: 'The process of evaluating an applicant’s risk to determine premium rates is called:',
    choices: ['Claim adjustment', 'Underwriting', 'Risk retention', 'Reinsurance'],
    correct_index: 1,
    explanation: 'Underwriting assesses applicant risk and classifies it for pricing and acceptance decisions.'
  },
  {
    id: 'ny6', state: 'New York', license_type: 'Life', topic: 'Taxation',
    difficulty: 'medium',
    question: 'Life insurance premiums are generally:',
    choices: ['Tax deductible for the insured', 'Not tax deductible for the insured', 'Taxable to the beneficiary', 'Subject to state sales tax'],
    correct_index: 1,
    explanation: 'Premiums are usually paid with after-tax dollars and are not deductible on the insured’s personal tax return.'
  },

  // ---------- CALIFORNIA ----------
  {
    id: 'ca1', state: 'California', license_type: 'Life & Health', topic: 'State Regulation',
    difficulty: 'medium',
    question: 'In California, the free-look period for a life policy is at least:',
    choices: ['10 days', '20 days', '30 days', '60 days'],
    correct_index: 2,
    explanation: 'California law provides a minimum 30-day free-look period for life policies delivered in the state.'
  },
  {
    id: 'ca2', state: 'California', license_type: 'Life & Health', topic: 'Taxation',
    difficulty: 'medium',
    question: 'Life insurance premiums are generally:',
    choices: ['Tax deductible for the insured', 'Not tax deductible for the insured', 'Taxable to the beneficiary', 'Subject to sales tax'],
    correct_index: 1,
    explanation: 'Premiums are usually paid with after-tax dollars and are not deductible on the insured’s personal tax return.'
  },
  {
    id: 'ca3', state: 'California', license_type: 'Health', topic: 'Health Insurance',
    difficulty: 'medium',
    question: 'California’s state-based marketplace for individual health coverage is called:',
    choices: ['Covered California', 'CalCare', 'HealthNY', 'BenefitCA'],
    correct_index: 0,
    explanation: 'Covered California is the state’s official health insurance exchange for individual and small-group plans.'
  },
  {
    id: 'ca4', state: 'California', license_type: 'Life', topic: 'Policy Provisions',
    difficulty: 'easy',
    question: 'The clause that allows the policy to be restored after lapse upon proof of insurability and payment is:',
    choices: ['Grace period', 'Reinstatement clause', 'Incontestability clause', 'Assignment clause'],
    correct_index: 1,
    explanation: 'The reinstatement clause lets a lapsed policy be put back in force, typically within a set window and with evidence of insurability.'
  },
  {
    id: 'ca5', state: 'California', license_type: 'Health', topic: 'Government Programs',
    difficulty: 'easy',
    question: 'Medi-Cal is California’s name for which federal-state program?',
    choices: ['Medicare', 'Medicaid', 'CHIP', 'VA'],
    correct_index: 1,
    explanation: 'Medi-Cal is California’s Medicaid program providing health coverage to eligible low-income residents.'
  },
  {
    id: 'ca6', state: 'California', license_type: 'Life & Health', topic: 'Ethics',
    difficulty: 'medium',
    question: 'A California agent must disclose replacement to the existing insurer within:',
    choices: ['5 days', '10 days', '20 days', 'No requirement'],
    correct_index: 1,
    explanation: 'California replacement rules require the replacing agent to notify the existing insurer, commonly within 10 days of the application.'
  },

  // ---------- FLORIDA ----------
  {
    id: 'fl1', state: 'Florida', license_type: 'Life', topic: 'Underwriting',
    difficulty: 'medium',
    question: 'The process of evaluating an applicant’s risk to determine premium rates is called:',
    choices: ['Claim adjustment', 'Underwriting', 'Risk retention', 'Reinsurance'],
    correct_index: 1,
    explanation: 'Underwriting assesses applicant risk and classifies it for pricing and acceptance decisions.'
  },
  {
    id: 'fl2', state: 'Florida', license_type: 'Life & Health', topic: 'State Regulation',
    difficulty: 'medium',
    question: 'Florida insurance is primarily regulated by the:',
    choices: ['Federal Insurance Office', 'Florida Office of Insurance Regulation', 'NAIC directly', 'SEC'],
    correct_index: 1,
    explanation: 'The Florida Office of Insurance Regulation (OIR) oversees insurance matters within the state.'
  },
  {
    id: 'fl3', state: 'Florida', license_type: 'Life', topic: 'Annuities',
    difficulty: 'medium',
    question: 'Florida requires a buyer’s guide and suitability review before recommending which product?',
    choices: ['Term life only', 'Annuities', 'Group health', 'Travel insurance'],
    correct_index: 1,
    explanation: 'Florida requires producers to use an annuity suitability form and provide a buyer’s guide to protect consumers.'
  },
  {
    id: 'fl4', state: 'Florida', license_type: 'Health', topic: 'Health Insurance',
    difficulty: 'easy',
    question: 'Which Florida program provides low-cost health coverage to children of eligible working families?',
    choices: ['Florida KidCare', 'Medicare', 'VA Choice', 'Medigap'],
    correct_index: 0,
    explanation: 'Florida KidCare is the state’s child health insurance program for eligible families.'
  },
  {
    id: 'fl5', state: 'Florida', license_type: 'Life', topic: 'Policy Provisions',
    difficulty: 'easy',
    question: 'A provision that lets the policyowner exchange term coverage for permanent without new proof of insurability is a:',
    choices: ['Conversion option', 'Reinstatement clause', 'Assignment clause', 'Grace period'],
    correct_index: 0,
    explanation: 'The conversion option allows term policies to be converted to permanent coverage without evidence of insurability, within limits.'
  },
  {
    id: 'fl6', state: 'Florida', license_type: 'Life & Health', topic: 'Ethics',
    difficulty: 'medium',
    question: 'Selling insurance in Florida without a valid license is:',
    choices: ['A minor infraction', 'A criminal offense', 'Allowed for family', 'Permitted online'],
    correct_index: 1,
    explanation: 'Transacting insurance without a license in Florida is unlawful and can carry criminal penalties.'
  }
]
