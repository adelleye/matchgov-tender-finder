
import { format, addDays } from 'date-fns';

export interface Tender {
  id: string;
  title: string;
  department: string;
  deadline: string;
  description: string;
  buyer: string;
  closingDate: string;
  naicsCodes: string[];
  tags: string[];
  value?: string;
  matchScore?: number;
  image?: string;
}

const mockImages = [
  "/placeholder.svg",
  "/placeholder.svg",
  "/placeholder.svg"
];

// Mock data for tenders
const mockTenders: Tender[] = [
  {
    id: '1',
    title: 'Supply and Delivery of IT Equipment',
    department: 'Department of Innovation, Science and Economic Development Canada',
    deadline: format(addDays(new Date(), 15), 'yyyy-MM-dd'),
    description: 'The Government of Canada is seeking a supplier to provide and deliver IT equipment, including laptops, desktops, and related peripherals. The contract will require timely delivery and adherence to specific technical specifications. The successful bidder must demonstrate a proven track record of supplying similar equipment to large organizations and provide excellent customer support.',
    buyer: 'Government of Canada',
    closingDate: '2024-07-20',
    naicsCodes: ['541512'],
    tags: ['IT Equipment', 'Hardware', 'Software'],
    value: '$100,000 - $250,000',
    matchScore: 0.87,
    image: mockImages[0]
  },
  {
    id: '2',
    title: 'Provision of Cybersecurity Services',
    department: 'Canadian Heritage',
    deadline: format(addDays(new Date(), 20), 'yyyy-MM-dd'),
    description: 'Canadian Heritage is looking for cybersecurity services to protect digital assets and infrastructure. Services required include vulnerability assessment, penetration testing, and security monitoring.',
    buyer: 'Canadian Heritage',
    closingDate: '2024-07-25',
    naicsCodes: ['541515'],
    tags: ['Cybersecurity', 'IT Security', 'Digital Protection'],
    value: '$75,000 - $150,000',
    matchScore: 0.78,
    image: mockImages[1]
  },
  {
    id: '3',
    title: 'Consulting Services for Digital Transformation',
    department: 'Employment and Social Development Canada',
    deadline: format(addDays(new Date(), 25), 'yyyy-MM-dd'),
    description: 'Employment and Social Development Canada seeks consulting services for digital transformation initiatives to modernize service delivery and improve citizen experience.',
    buyer: 'Employment and Social Development Canada',
    closingDate: '2024-07-30',
    naicsCodes: ['541611', '541512'],
    tags: ['Digital Transformation', 'Consulting', 'Service Design'],
    value: '$200,000 - $500,000',
    matchScore: 0.92,
    image: mockImages[2]
  }
];

export const getTenders = async (): Promise<Tender[]> => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  return mockTenders;
};

export const getTenderById = async (id: string): Promise<Tender | undefined> => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 500));
  return mockTenders.find(tender => tender.id === id);
};

// Get tenders for a specific category (new, saved, ignored)
export const getTendersByCategory = async (category: 'new' | 'saved' | 'ignored'): Promise<Tender[]> => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 800));
  
  // In a real app, we'd filter based on user preferences/history
  // For now, return all tenders for 'new', and empty arrays for others
  switch (category) {
    case 'new':
      return mockTenders;
    case 'saved':
      return mockTenders.slice(0, 1); // Just return the first item as "saved"
    case 'ignored':
      return []; // No ignored tenders for now
    default:
      return [];
  }
};
