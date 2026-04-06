window.SITE_CONTENT = {
  hero: {
    titleLine1: "On the Instruction-Following Limitations of",
    titleLine2: "Vision-Language-Action Models on LIBERO",
    lab: "Computer Security & Privacy Laboratory @ WashU",
    subtitle: "VLAs fine-tuned on the LIBERO benchmark exhibit severe overfitting.",
  },
  sections: {
    introduction: {
      paragraphs: [
        "LIBERO is a widely used benchmark for evaluating vision-language-action (VLA) models. We study two state-of-the-art VLAs, **OpenVLA** and **Pi0.5**, to examine whether models fine-tuned on LIBERO truly follow language instructions or instead overfit to the scene.",
        "We find that, in the Spatial and Object suites, benchmark success persists even under **empty** or **negative prompts**. This suggests that the language instruction is not being faithfully followed, and that the VLA models are overfitted to infer the task from scene layout alone.",
      ],
    },
    results: {
      intro:
        "We summarize on Spatial and Object task suites, where each task is paired with a different scene and shortcutting is most visible. The table below distills the main finding across those suites.",
      highlight:
        "LIBERO-finetuned VLAs often recover the task from the scene instead of from the prompt.",
    },
    openvla: {
      intro:
        "This section shows representative examples for the OpenVLA model under standard, empty, and negative prompts.",
      conclusion:
        "This suggests that the VLA does not exhibit semantic instruction following; it just overfits to the scene",
    },
    pi05: {
      intro:
        "Prompt edits on the cream-cheese task show the same failure mode in pi0.5: the behavior stays tied to the original scene, and changing or removing the prompt does not reliably redirect the policy to the newly specified object.",
    },
    shuffle: {
      intro:
        "This is the mechanism-level probe. We further explored the model's reliance on the recognized scene with seeded random shuffles of object positions within the same task. Two shuffled examples then show how brittle the behavior becomes once layout regularities are broken. Across 100 shuffled tests, task success rate falls from **98.4% to 23%**.",
      conclusion:
        "We found that even when the target object is swapped to a different place, the VLA still reaches for the object in the original location. This failure mode suggests that the VLA memorizes the action or target location associated with the scene, rather than understanding the specific object semantics.",
    },
    conclusion: {
      paragraphs: [
        "LIBERO is a valuable benchmark for robotics evaluation, but it has important limitations for assessing instruction following in VLA models.",
        "In particular, the benchmark tightly couples language instructions with task-specific scene configurations, which can encourage models to infer the task directly from the scene rather than rely on the instruction itself.",
        "As a result, strong benchmark performance may overestimate a model’s true instruction-following capability.",
      ],
    },
  },
  overall_results: [
    {
      model: "OpenVLA",
      condition: "Official baseline",
      scope: "Spatial + Object (200 episodes)",
      expected: "-",
      actual: "195/200 (97.5%)",
    },
    {
      model: "OpenVLA",
      condition: "Empty prompt",
      scope: "Spatial + Object (200 episodes)",
      expected: "0%",
      actual: "179/200 (89.5%)",
    },
    {
      model: "OpenVLA",
      condition: "Don't do anything",
      scope: "Spatial + Object (200 episodes)",
      expected: "0%",
      actual: "181/200 (90.5%)",
    },
    {
      model: "pi0.5",
      condition: "Official baseline",
      scope: "Spatial + Object (500 episodes)",
      expected: "-",
      actual: "492/500 (98.4%)",
    },
    {
      model: "pi0.5",
      condition: "Empty prompt",
      scope: "Spatial + Object (200 episodes)",
      expected: "0%",
      actual: "121/200 (60.5%)",
    },
  ],
  openvla_modules: [
    {
      title: "Spatial task",
      caption:
        "OpenVLA continues the same bowl-placement behavior even when the prompt is removed or replaced by a negative prompt.",
      videos: [
        {
          title: "Standard prompt",
          caption:
            "Task: pick up the black bowl between the plate and the ramekin and place it on the plate.",
          model: "openvla",
          suite: "spatial",
          condition: "standard prompt",
          prompt_text:
            "pick up the black bowl between the plate and the ramekin and place it on the plate",
          result: "success",
          src: "openvla_spatial/task.mp4",
        },
        {
          title: "Empty prompt",
          caption: "Expected: Robot do nothing\nActual: robot executed the original task",
          model: "openvla",
          suite: "spatial",
          condition: "empty prompt",
          prompt_text: "",
          result: "success",
          src: "openvla_spatial/empty.mp4",
        },
        {
          title: "Don't do anything",
          caption: "Expected: Robot do nothing\nActual: robot executed the original task",
          model: "openvla",
          suite: "spatial",
          condition: "negative prompt",
          prompt_text: "don't do anything",
          result: "success",
          src: "openvla_spatial/do_nothing.mp4",
        },
      ],
    },
    {
      title: "Object task",
      caption:
        "OpenVLA also keeps executing the original Object task after prompt removal or a negative prompt.",
      videos: [
        {
          title: "Standard prompt",
          caption: "Task: pick up the cream cheese and place it in the basket.",
          model: "openvla",
          suite: "object",
          condition: "standard prompt",
          prompt_text: "pick up the cream cheese and place it in the basket",
          result: "success",
          src: "openvla_object/task.mp4",
        },
        {
          title: "Empty prompt",
          caption: "Expected: Robot do nothing\nActual: robot executed the original task",
          model: "openvla",
          suite: "object",
          condition: "empty prompt",
          prompt_text: "",
          result: "success",
          src: "openvla_object/empty.mp4",
        },
        {
          title: "Don't do anything",
          caption: "Expected: Robot do nothing\nActual: robot executed the original task",
          model: "openvla",
          suite: "object",
          condition: "negative prompt",
          prompt_text: "don't do anything",
          result: "success",
          src: "openvla_object/do_nothing.mp4",
        },
      ],
    },
  ],
  pi05_modules: [
    {
      title: "Object task",
      caption:
        "On the same cream-cheese scene, pi0.5 often keeps the original behavior despite empty prompts or prompt editing.",
      videos: [
        {
          title: "Standard prompt",
          caption: "Original cream-cheese task under the baseline prompt.",
          model: "pi05",
          suite: "object",
          condition: "standard prompt",
          prompt_text: "pick up the cream cheese and place it in the basket",
          result: "success",
          src: "object_baseline/rollout_pick_up_the_cream_cheese_and_place_it_in_the_basket_success.mp4",
        },
        {
          title: "Empty prompt",
          caption: "Expected: Robot do nothing\nActual: robot executed the original task",
          model: "pi05",
          suite: "object",
          condition: "empty prompt",
          prompt_text: " ",
          result: "success",
          src: "object_different_prompt/object_task01_episode00_pick_up_the_cream_cheese_and_place_it_in_the_basket_prompt_blank_success.mp4",
        },
        {
          title: "Don't do anything",
          caption: "Expected: Robot do nothing\nActual: robot executed the original task",
          model: "pi05",
          suite: "object",
          condition: "negative prompt",
          prompt_text: "Don't do anything",
          result: "success",
          src: "object_different_prompt/object_task01_episode00_pick_up_the_cream_cheese_and_place_it_in_the_basket_prompt_Don_t_do_anything_success.mp4",
        },
      ],
    },
  ],
  shortcut_modules: [
    {
      title: "Cream-cheese task under scene perturbation",
      caption:
        "When we perturb the object layout in the Object suite, performance becomes poor and the positional shortcut becomes explicit. Once that regularity is broken, success drops sharply.",
      videos: [
        {
          title: "Baseline scene",
          caption: "Original cream-cheese task in the standard LIBERO Object layout.",
          model: "pi05",
          suite: "object",
          condition: "baseline",
          prompt_text: "pick up the cream cheese and place it in the basket",
          result: "success",
          src: "object_baseline/rollout_pick_up_the_cream_cheese_and_place_it_in_the_basket_success.mp4",
          notes: "The cream cheese begins in the task's designated target region.",
        },
        {
          title: "Swap milk and cheese",
          caption: "The original prompt no longer guarantees the correct object once the layout prior is disturbed.",
          model: "pi05",
          suite: "object",
          condition: "scene perturbation",
          prompt_text: "pick up the cream cheese and place it in the basket",
          result: "failure",
          src: "object_different_prompt/object_task01_episode00_pick_up_the_cream_cheese_and_place_it_in_the_basket_prompt_pick_up_the_cream_cheese_and_place_it_in_the_basket_failure.mp4",
        },
        {
          title: "Seeded shuffle: failure case",
          caption: "Full object shuffle, cream-cheese task, failure example 1.",
          model: "pi05",
          suite: "object",
          condition: "shuffle failure",
          prompt_text: "pick up the cream cheese and place it in the basket",
          result: "failure",
          src: "shuffle_test/shuffle_task01_trial02_episode15_pick_up_the_cream_cheese_and_place_it_in_the_basket_prompt_pick_up_the_cream_cheese_and_place_it_in_failure.mp4",
          
        },
        {
          title: "Seeded shuffle: failure case",
          caption: "Full object shuffle, cream-cheese task, failure example 2.",
          model: "pi05",
          suite: "object",
          condition: "shuffle failure",
          prompt_text: "pick up the cream cheese and place it in the basket",
          result: "failure",
          src: "shuffle_test/shuffle_task01_trial06_episode34_pick_up_the_cream_cheese_and_place_it_in_the_basket_prompt_pick_up_the_cream_cheese_and_place_it_in_failure.mp4",
        },
      ],
    },
  ],
};
