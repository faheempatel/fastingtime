type rule = {
  title: string,
  description: option<string>,
}

let allowed = [
  {
    title: "Using miswak or toothbrush (even with toothpaste)",
    description: Some("Be careful not to swallow or overdo it"),
  },
  {
    title: "Eating or drinking unintentionally",
    description: Some(
      "i.e. forgetting that you were fasting. But you must stop as soon as you realise and continue with your fast",
    ),
  },
  {
    title: "Rinsing the mouth or nostrils with water",
    description: Some("Provided it is not overdone (so as to avoid swallowing water)"),
  },
  {
    title: "Swallowing your own saliva",
    description: None,
  },
  {
    title: "Using perfumes, wearing contact lenses or using eye drops",
    description: None,
  },
]

let disallowed = [
  {
    title: "Eating or drinking deliberately",
    description: Some("This includes taking any non-nourishing items by mouth or nose"),
  },
  {
    title: "The beginning of menstrual or post-childbirth bleeding",
    description: Some("Even if it occurs in the last moments before sunset"),
  },
  {
    title: "Eating, drinking, smoking or having sexual intercourse after Fajr (dawn) on the mistaken assumption that it is not Fajr time yet",
    description: Some(
      "Similarly, engaging in these acts before Maghrib (sunset) on the mistaken assumption that it is already Maghrib time",
    ),
  },
  {
    title: "Deliberately causing yourself to vomit",
    description: None,
  },
]
