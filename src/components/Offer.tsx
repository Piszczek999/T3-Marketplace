interface OfferProp {
  id: string;
  userId: string;
  name: string;
  description: string;
  createdAt: Date;
}

export default function Offer({ offer }: { offer: OfferProp }) {
  return (
    <div key={offer.id} className="flex flex-col gap-2 bg-slate-800 p-2">
      <p>{offer.name}</p>
      <p>{offer.description}</p>
    </div>
  );
}
