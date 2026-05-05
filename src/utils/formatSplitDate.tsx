
export const formatSplitDate = (value?: string) => {
  if (!value) return "";

  const d = new Date(value);
  if (isNaN(d.getTime())) return "";

  const dayMonth = `${String(d.getDate()).padStart(2, "0")} ${d.toLocaleString("en-GB", {
    month: "short",
  })}`;

  const year = d.getFullYear();

  return (
    <>
      <div>{dayMonth}</div>
      <div className="text-xs text-muted-foreground">{year}</div>
    </>
  );
};