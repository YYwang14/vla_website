window.SITE_CONTENT = {
  hero: {
    titleLine1: "On the Instruction-Following Limitations of",
    titleLine2: "Vision-Language-Action Models on LIBERO",
    lab: "Computer Security & Privacy Laboratory @WashU",
    subtitle: "LIBERO-finetuned VLAs often recover the task from the scene instead of from the prompt.",
  },
  sections: {
    introduction: {
      paragraphs: [
        "LIBERO is widely used to evaluate vision-language-action models. Here we test two state-of-the-art VLA models, **OpenVLA** and **Pi0.5**, to see whether LIBERO-finetuned VLAs actually follow the language instruction, or instead infer the task from the scene.",
        "We find that, in the Spatial and Object suites, benchmark success often survives empty prompts and negative prompts. This suggests that the models are not using language as the primary task signal; instead, they often recover the task from the scene layout.",
      ],
    },
    results: {
      intro:
        "We summarize only Spatial and Object, where each task is paired with a different scene and shortcutting is most visible. The table below distills the main finding across those suites.",
      highlight:
        "LIBERO-finetuned VLAs often recover the task from the scene instead of from the prompt.",
    },
    openvla: {
      intro:
        "This section shows representative Spatial and Object rollouts for the combined OpenVLA-OFT checkpoint under standard, empty, and negative prompts.",
      conclusion:
        "This suggests that the VLA does not exhibit semantic instruction following; it mainly recovers the task from the scene.",
    },
    pi05: {
      intro:
        "Prompt edits on the cream-cheese task show the same failure mode in pi0.5: the behavior stays tied to the original scene, and changing or removing the prompt does not reliably redirect the policy to the newly specified object.",
    },
    shuffle: {
      intro:
        "When we perturb the object layout in the Object suite, performance becomes brittle and the positional shortcut becomes explicit. Once that regularity is broken, success drops sharply.",
    },
    conclusion: {
      paragraphs: [
        "LIBERO is valuable for robotics evaluation, but it has limitations when used to assess instruction following in VLAs.",
        "In particular, the Spatial and Object suites can reward scene-based task recovery, which overstates instruction-following ability.",
      ],
    },
  },
  overall_results: [
    {
      model: "OpenVLA-OFT",
      condition: "Official baseline",
      scope: "Spatial + Object (200 episodes)",
      expected: "-",
      actual: "195/200 (97.5%)",
    },
    {
      model: "OpenVLA-OFT",
      condition: "Empty prompt",
      scope: "Spatial + Object (200 episodes)",
      expected: "0",
      actual: "179/200 (89.5%)",
    },
    {
      model: "OpenVLA-OFT",
      condition: "Don't do anything",
      scope: "Spatial + Object (200 episodes)",
      expected: "0",
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
      expected: "0",
      actual: "121/200 (60.5%)",
    },
  ],
  openvla_modules: [
    {
      title: "Spatial task",
      caption:
        "OpenVLA-OFT continues the same bowl-placement behavior even when the prompt is removed or replaced by a negative prompt.",
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
          caption: "Expected: Robot do nothing\nAcutal: robot executed the original task",
          model: "openvla",
          suite: "spatial",
          condition: "empty prompt",
          prompt_text: "",
          result: "success",
          src: "openvla_spatial/empty.mp4",
        },
        {
          title: "Don't do anything",
          caption: "Expected: Robot do nothing\nAcutal: robot executed the original task",
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
        "OpenVLA-OFT also keeps executing the original Object task after prompt removal or a negative prompt.",
      videos: [
        {
          title: "Standard prompt",
          caption: "Task: pick up the cream cheese and place it in the basket.",
          model: "openvla",
          suite: "object",
          condition: "task",
          prompt_text: "pick up the cream cheese and place it in the basket",
          result: "success",
          src: "openvla_object/task.mp4",
        },
        {
          title: "Empty prompt",
          caption: "Expected: Robot do nothing\nAcutal: robot executed the original task",
          model: "openvla",
          suite: "object",
          condition: "empty prompt",
          prompt_text: "",
          result: "success",
          src: "openvla_object/empty.mp4",
        },
        {
          title: "Don't do anything",
          caption: "Expected: Robot do nothing\nAcutal: robot executed the original task",
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
      title: "Object prompt probes",
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
          caption: "Expected: Robot do nothing\nAcutal: robot executed the original task",
          model: "pi05",
          suite: "object",
          condition: "empty prompt",
          prompt_text: " ",
          result: "success",
          src: "object_different_prompt/object_task01_episode00_pick_up_the_cream_cheese_and_place_it_in_the_basket_prompt_blank_success.mp4",
        },
        {
          title: "Negative prompt",
          caption: "Expected: Robot do nothing\nAcutal: robot executed the original task",
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
        "This is the mechanism-level probe. The baseline succeeds, but after the cream-cheese / milk layout perturbation the same prompt no longer grounds reliably. Two seeded shuffle examples then show how brittle the behavior becomes once layout regularities are broken.",
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
          title: "Scene perturbation / swap probe",
          caption: "Same prompt after the cream-cheese / milk layout probe.",
          model: "pi05",
          suite: "object",
          condition: "scene perturbation",
          prompt_text: "pick up the cream cheese and place it in the basket",
          result: "failure",
          src: "object_different_prompt/object_task01_episode00_pick_up_the_cream_cheese_and_place_it_in_the_basket_prompt_pick_up_the_cream_cheese_and_place_it_in_the_basket_failure.mp4",
          notes: "The original prompt no longer guarantees the correct object once the layout prior is disturbed.",
        },
        {
          title: "Seeded shuffle: failure case",
          caption: "Full object shuffle, cream-cheese task, failure example.",
          model: "pi05",
          suite: "object",
          condition: "shuffle failure",
          prompt_text: "pick up the cream cheese and place it in the basket",
          result: "failure",
          src: "shuffle_test/shuffle_task01_trial00_episode26_pick_up_the_cream_cheese_and_place_it_in_the_basket_prompt_pick_up_the_cream_cheese_and_place_it_in_failure.mp4",
          notes: "Across 100 shuffled Object episodes, success falls to 23/100.",
        },
        {
          title: "Seeded shuffle: success case",
          caption: "Full object shuffle, cream-cheese task, success example.",
          model: "pi05",
          suite: "object",
          condition: "shuffle success",
          prompt_text: "pick up the cream cheese and place it in the basket",
          result: "success",
          src: "shuffle_test/shuffle_task01_trial03_episode02_pick_up_the_cream_cheese_and_place_it_in_the_basket_prompt_pick_up_the_cream_cheese_and_place_it_in_success.mp4",
          notes: "The remaining successes are brittle and heavily layout-dependent.",
        },
      ],
    },
  ],
};
