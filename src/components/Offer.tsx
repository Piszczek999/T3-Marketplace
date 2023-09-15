interface OfferProp {
  id: string;
  userId: string;
  name: string;
  description: string;
  createdAt: Date;
  price: number;
}

export default function Offer({ offer }: { offer: OfferProp }) {
  return (
    <div key={offer.id} className="flex flex-col gap-2 bg-slate-800 p-2">
      <p className="text-lg font-semibold">{offer.name}</p>
      <p className="text-slate-300">{offer.description}</p>
      <p>{`${offer.price}$`}</p>
    </div>
  );
}
