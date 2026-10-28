export function scrollFeedToIndex(
  container: HTMLElement | null | undefined,
  index: number,
  behavior: ScrollBehavior = "smooth",
) {
  const target = container?.children[index] as HTMLElement | undefined;
  target?.scrollIntoView({ behavior, block: "start" });
}
