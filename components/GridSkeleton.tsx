export default function GridSkeleton({ n = 6 }: { n?: number }) {
  return (
    <div className="grid" aria-busy="true" aria-label="Loading projects">
      {Array.from({ length: n }, (_, i) => (
        <div key={i} className="card skel">
          <div className="skel-cover" />
          <div className="card-body"><i /><i /><i className="short" /></div>
        </div>
      ))}
    </div>
  );
}
