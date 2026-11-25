import { GENERAL_QUESTION, waLink } from '@/utils/links';
import { WaIcon } from './Icons';

export default function WhatsAppFloat() {
  return (
    <a className="wa-float" href={waLink(GENERAL_QUESTION)} target="_blank" rel="noopener noreferrer" aria-label="Chat on WhatsApp">
      <WaIcon />
    </a>
  );
}
