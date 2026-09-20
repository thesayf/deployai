/** M25 case-study flip card — portrait image front, accent-ground outcome face on hover. */
export interface CaseCardProps {
  /** 4:5 portrait image path */
  img: string;
  /** object-position for the crop */
  pos?: string;
  href?: string;
  title: string;
  client: string;
  desc: React.ReactNode;
  sector: string;
  metric: string;
}
