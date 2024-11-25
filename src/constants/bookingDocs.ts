import LinkIcon from 'views/components/icons/LinkIcon';
import LogoIcon from 'views/components/icons/LogoIcon';
import PdfIcon from 'views/components/icons/PdfIcon';

export const documentList = [
  {
    name: 'Just Be Lekker - T&C',
    link: 'https://example.com/doc1.pdf',
    iconUrl: `${LogoIcon}`, // Add your icon url
  },
  {
    name: 'Rental T&C.pdf',
    link: 'https://example.com/doc2.pdf',
    iconUrl: `${PdfIcon}`, // Use default file icon for PDFs
  },
  {
    name: 'Rules T&C.pdf',
    link: 'https://example.com/doc3.pdf',
    iconUrl: `${LinkIcon}`,
  },
];
