interface Props {
  title: string;
  description?: string;
  right?: React.ReactNode;
}

export default function PageHeader({ title, description, right }: Props) {
  return (
    <header className="hidden md:flex items-start justify-between mb-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">{title}</h1>
        {description && (
          <p className="text-sm text-muted-foreground mt-1">{description}</p>
        )}
      </div>
      {right && <div className="flex items-center gap-2">{right}</div>}
    </header>
  );
}
