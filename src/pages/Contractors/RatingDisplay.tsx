type RatingDisplayProps = {
  rating: string;
};

export function RatingDisplay({ rating }: RatingDisplayProps) {
  const numRating = parseFloat(rating);
  if (isNaN(numRating) || numRating === 0) {
    return <span className="text-muted-foreground">No ratings yet</span>;
  }

  return (
    <div className="flex items-center gap-1">
      <span className="font-medium">{numRating.toFixed(1)}</span>
      <span className="text-yellow-500">★</span>
    </div>
  );
}