window.SITE_CONTENT = {
  "hero": {
    "eyebrow": "A short evidence briefing for VLA researchers",
    "title": "Do LIBERO-finetuned VLAs actually follow instructions?",
    "takeaway": "Across OpenVLA-OFT and pi0.5, benchmark success often survives empty or contradictory prompts whenever the scene itself strongly identifies the task. The strongest failures appear exactly when language should matter most: same-scene Goal tasks and scene-structure perturbations.",
    "actions": [
      {
        "label": "Watch evidence",
        "href": "#openvla",
        "primary": true
      },
      {
        "label": "Read writeup",
        "href": "#artifacts",
        "primary": false
      },
      {
        "label": "Browse all videos",
        "href": "#artifacts",
        "primary": false
      }
    ]
  },
  "stats_cards": [
    {
      "label": "OpenVLA-OFT Goal",
      "value": "97% \u2192 10%",
      "subtext": "Same-scene Goal tasks collapse under empty or contradictory prompts."
    },
    {
      "label": "OpenVLA-OFT Object",
      "value": "97% \u2192 96%",
      "subtext": "Object success barely changes when the prompt is removed."
    },
    {
      "label": "pi0.5 Goal (muted prompt)",
      "value": "3 / 50",
      "subtext": "Only 6% success when the shared Goal scene must be disambiguated by language."
    }
  ],
  "summary": {
    "intro": "The main issue is not that the models fail the benchmark. They pass it. The issue is that they often keep passing when the language signal is removed or contradicted, which means benchmark success is not a reliable proxy for instruction following.",
    "bullets": [
      {
        "title": "OpenVLA-OFT keeps succeeding without language",
        "body": "On Object and much of Spatial, OpenVLA-OFT remains highly successful even with an empty prompt or the instruction \u201cdon\u2019t do anything.\u201d"
      },
      {
        "title": "Same-scene Goal tasks expose the dependency on language",
        "body": "When all tasks share one scene and language must select the behavior, both models degrade sharply under prompt ablations."
      },
      {
        "title": "pi0.5 shows scene/layout shortcutting",
        "body": "Prompt edits, object swaps, and seeded shuffles indicate that object placement and scene structure can dominate the desired instruction."
      }
    ]
  },
  "labels": {
    "suites": {
      "libero_goal": "Goal",
      "libero_object": "Object",
      "libero_spatial": "Spatial"
    }
  },
  "table_rows": {
    "openvla": [
      {
        "task_suite": "libero_goal",
        "prompt_condition": "do_nothing",
        "success_rate": 0.1
      },
      {
        "task_suite": "libero_goal",
        "prompt_condition": "empty",
        "success_rate": 0.1
      },
      {
        "task_suite": "libero_goal",
        "prompt_condition": "task",
        "success_rate": 0.97
      },
      {
        "task_suite": "libero_object",
        "prompt_condition": "do_nothing",
        "success_rate": 0.97
      },
      {
        "task_suite": "libero_object",
        "prompt_condition": "empty",
        "success_rate": 0.96
      },
      {
        "task_suite": "libero_object",
        "prompt_condition": "task",
        "success_rate": 0.97
      },
      {
        "task_suite": "libero_spatial",
        "prompt_condition": "do_nothing",
        "success_rate": 0.84
      },
      {
        "task_suite": "libero_spatial",
        "prompt_condition": "empty",
        "success_rate": 0.83
      },
      {
        "task_suite": "libero_spatial",
        "prompt_condition": "task",
        "success_rate": 0.98
      }
    ],
    "pi05": [
      {
        "setting": "Official baseline",
        "suite": "Spatial",
        "episodes": "500",
        "success": "98.4%"
      },
      {
        "setting": "Muted prompt (\" \")",
        "suite": "Spatial",
        "episodes": "100",
        "success": "61%"
      },
      {
        "setting": "Muted prompt (\" \")",
        "suite": "Object",
        "episodes": "100",
        "success": "60%"
      },
      {
        "setting": "Muted prompt (\" \")",
        "suite": "Goal",
        "episodes": "50",
        "success": "6%"
      },
      {
        "setting": "Seeded object shuffle",
        "suite": "Object",
        "episodes": "100",
        "success": "23%"
      }
    ]
  },
  "sections": {
    "openvla": {
      "intro": "These results come from the single combined checkpoint moojink/openvla-7b-oft-finetuned-libero-spatial-object-goal-10 over 900 rollouts: 3 suites \u00d7 3 prompt conditions \u00d7 10 tasks \u00d7 10 episodes.",
      "interpretation": "The pattern is asymmetric. Goal tasks depend on the prompt because all tasks share one scene. Object and much of Spatial do not, so the model still executes the original behavior without meaningful language."
    },
    "pi05": {
      "intro": "For pi0.5, we use the official OpenPI baseline on LIBERO Spatial and custom evaluation scripts for prompt probes, same-scene Goal tests, object-level prompt edits, and scene-layout perturbations.",
      "caveat": "The muted pi0.5 client prompt is a single blank space rather than a strict empty string. Debug traces show that this still produces only two active prompt tokens, while the two camera views contribute 512 visual tokens."
    },
    "shortcuts": {
      "intro": "The Object-suite task files explicitly separate target_object_region from other_object_region placements. Once the scene is perturbed, the arm often follows those positional priors rather than the object named in the prompt."
    },
    "composition": {
      "intro": "These edited prompts are all run on the same Goal scene. The resulting behavior looks more like shallow recombination of memorized actions than robust language-grounded composition."
    },
    "method": {
      "cards": [
        {
          "title": "OpenVLA-OFT protocol",
          "body": "Custom server/client wrapper, combined OFT checkpoint, three prompt conditions, and 900 total rollouts across Spatial, Object, and Goal."
        },
        {
          "title": "pi0.5 protocol",
          "body": "Official OpenPI LIBERO evaluator for the released baseline, then custom scripts for muted prompts, Goal prompt edits, object-level prompt edits, and seeded object shuffles."
        },
        {
          "title": "Why Goal matters",
          "body": "Goal is the cleanest suite for instruction following because all 10 tasks share one scene. When language is removed there, both models degrade sharply."
        },
        {
          "title": "Why Object shuffles matter",
          "body": "Object tasks are not purely about language; scene structure leaks target identity. Shuffle and swap probes make that shortcut visible."
        }
      ]
    },
    "artifacts": {
      "intro": "The website focuses on the strongest examples. The full underlying media buckets, rollout CSVs, prompt-ablation logs, and manuscript source are linked below.",
      "writeup_snapshot": "The manuscript source is included directly on this site together with the OpenVLA summary CSV and rollout-level results. The page is meant to be a faster visual briefing than the writeup, not a replacement for the raw artifacts."
    }
  },
  "downloads": [
    {
      "label": "OpenVLA-OFT summary CSV",
      "href": "downloads/openvla_summary.csv"
    },
    {
      "label": "OpenVLA-OFT rollout-level CSV",
      "href": "downloads/openvla_rollout_results.csv"
    },
    {
      "label": "pi0.5 empty-prompt Spatial log",
      "href": "downloads/pi05_empty_prompt_spatial.log"
    },
    {
      "label": "pi0.5 empty-prompt Object log",
      "href": "downloads/pi05_empty_prompt_object.log"
    },
    {
      "label": "Polished manuscript source (main.tex)",
      "href": "downloads/main.tex"
    }
  ],
  "video_groups": {
    "openvla": [
      {
        "title": "Goal same-scene comparison",
        "caption": "OpenVLA-OFT succeeds on the original Goal prompt, then collapses on the same scene when the prompt is emptied or contradicted.",
        "model": "openvla",
        "suite": "goal",
        "videos": [
          {
            "title": "Original prompt",
            "caption": "Task 0: open the middle drawer of the cabinet.",
            "model": "openvla",
            "suite": "goal",
            "condition": "task",
            "task_id": 0,
            "prompt_text": "open the middle drawer of the cabinet",
            "prompt_label": "task",
            "result": "success",
            "src": "openvla_goal/task.mp4",
            "notes": "97% aggregate Goal success under the original prompt."
          },
          {
            "title": "Empty prompt",
            "caption": "Exact same scene and initial state, but the prompt is removed.",
            "model": "openvla",
            "suite": "goal",
            "condition": "empty",
            "task_id": 0,
            "prompt_text": "",
            "prompt_label": "empty",
            "result": "failure",
            "src": "openvla_goal/empty.mp4",
            "notes": "Aggregate Goal success falls to 10%."
          },
          {
            "title": "Contradictory prompt",
            "caption": "Prompt replaced with \u201cdon\u2019t do anything.\u201d",
            "model": "openvla",
            "suite": "goal",
            "condition": "do_nothing",
            "task_id": 0,
            "prompt_text": "don't do anything",
            "prompt_label": "do_nothing",
            "result": "failure",
            "src": "openvla_goal/do_nothing.mp4",
            "notes": "Contradictory language performs no better than no language."
          }
        ]
      },
      {
        "title": "Object comparison",
        "caption": "The same Object task still succeeds with no prompt and with \u201cdon\u2019t do anything,\u201d showing that the scene itself often identifies the task strongly enough.",
        "model": "openvla",
        "suite": "object",
        "videos": [
          {
            "title": "Original prompt",
            "caption": "Task 1: pick up the cream cheese and place it in the basket.",
            "model": "openvla",
            "suite": "object",
            "condition": "task",
            "task_id": 1,
            "prompt_text": "pick up the cream cheese and place it in the basket",
            "prompt_label": "task",
            "result": "success",
            "src": "openvla_object/task.mp4",
            "notes": "Object benchmark success is 97%."
          },
          {
            "title": "Empty prompt",
            "caption": "Same task and episode with an empty prompt.",
            "model": "openvla",
            "suite": "object",
            "condition": "empty",
            "task_id": 1,
            "prompt_text": "",
            "prompt_label": "empty",
            "result": "success",
            "src": "openvla_object/empty.mp4",
            "notes": "Aggregate Object success remains 96%."
          },
          {
            "title": "\u201cDon\u2019t do anything\u201d",
            "caption": "Same task and episode with contradictory language.",
            "model": "openvla",
            "suite": "object",
            "condition": "do_nothing",
            "task_id": 1,
            "prompt_text": "don't do anything",
            "prompt_label": "do_nothing",
            "result": "success",
            "src": "openvla_object/do_nothing.mp4",
            "notes": "Aggregate Object success remains 97%."
          }
        ]
      },
      {
        "title": "Spatial comparison",
        "caption": "Spatial also survives prompt removal in many cases. Performance drops, but much of the original behavior remains.",
        "model": "openvla",
        "suite": "spatial",
        "videos": [
          {
            "title": "Original prompt",
            "caption": "Task 0: pick up the bowl between the plate and the ramekin and place it on the plate.",
            "model": "openvla",
            "suite": "spatial",
            "condition": "task",
            "task_id": 0,
            "prompt_text": "pick up the black bowl between the plate and the ramekin and place it on the plate",
            "prompt_label": "task",
            "result": "success",
            "src": "openvla_spatial/task.mp4",
            "notes": "Spatial benchmark success is 98%."
          },
          {
            "title": "Empty prompt",
            "caption": "Same task and episode with the prompt removed.",
            "model": "openvla",
            "suite": "spatial",
            "condition": "empty",
            "task_id": 0,
            "prompt_text": "",
            "prompt_label": "empty",
            "result": "success",
            "src": "openvla_spatial/empty.mp4",
            "notes": "Aggregate Spatial success remains 83%."
          },
          {
            "title": "\u201cDon\u2019t do anything\u201d",
            "caption": "Same task and episode with contradictory language.",
            "model": "openvla",
            "suite": "spatial",
            "condition": "do_nothing",
            "task_id": 0,
            "prompt_text": "don't do anything",
            "prompt_label": "do_nothing",
            "result": "success",
            "src": "openvla_spatial/do_nothing.mp4",
            "notes": "Aggregate Spatial success remains 84%."
          }
        ]
      }
    ],
    "pi05": [
      {
        "title": "Goal prompt ablation on a shared scene",
        "caption": "The Goal suite is the cleanest instruction-following test because all tasks share one scene. Here the original prompt works, but the same scene fails under prompt removal and edited prompting.",
        "model": "pi05",
        "suite": "goal",
        "videos": [
          {
            "title": "Baseline Goal prompt",
            "caption": "Original Goal instruction succeeds.",
            "model": "pi05",
            "suite": "goal",
            "condition": "task",
            "task_id": 0,
            "prompt_text": "open the middle drawer of the cabinet",
            "prompt_label": "baseline",
            "result": "success",
            "src": "goal_baseline/rollout_open_the_middle_drawer_of_the_cabinet_success.mp4",
            "notes": "Representative baseline on the shared Goal scene."
          },
          {
            "title": "Muted prompt",
            "caption": "Prompt reduced to a blank-space token sequence.",
            "model": "pi05",
            "suite": "goal",
            "condition": "empty",
            "task_id": 0,
            "prompt_text": " ",
            "prompt_label": "blank-space prompt",
            "result": "failure",
            "src": "goal_empty_prompt/task00_episode00_open_the_middle_drawer_of_the_cabinet_failure.mp4",
            "notes": "Goal muted-prompt success is only 3/50."
          },
          {
            "title": "Edited prompt",
            "caption": "Prompt edited to \u201copen the middle drawer and put the bowl inside.\u201d",
            "model": "pi05",
            "suite": "goal",
            "condition": "custom",
            "task_id": 0,
            "prompt_text": "open the middle drawer and put the bowl inside",
            "prompt_label": "edited prompt",
            "result": "failure",
            "src": "goal_different_prompt/goal_task00_episode00_open_the_middle_drawer_of_the_cabinet_prompt_open_the_middle_drawer_and_put_the_bowl_inside_failure.mp4",
            "notes": "The arm still executes a memorized action pattern instead of composing the request."
          }
        ]
      },
      {
        "title": "Object prompt probes on the cream-cheese task",
        "caption": "The same Object scene is probed with blank, contradictory, and wrong-object prompts. The model does not reliably switch to the newly named object.",
        "model": "pi05",
        "suite": "object",
        "videos": [
          {
            "title": "Baseline Object prompt",
            "caption": "Original cream-cheese task under the baseline prompt.",
            "model": "pi05",
            "suite": "object",
            "condition": "task",
            "task_id": 1,
            "prompt_text": "pick up the cream cheese and place it in the basket",
            "prompt_label": "baseline",
            "result": "success",
            "src": "object_baseline/rollout_pick_up_the_cream_cheese_and_place_it_in_the_basket_success.mp4",
            "notes": "Representative baseline object rollout."
          },
          {
            "title": "Blank prompt",
            "caption": "The client sends a blank-space prompt on the same task.",
            "model": "pi05",
            "suite": "object",
            "condition": "empty",
            "task_id": 1,
            "prompt_text": " ",
            "prompt_label": "blank-space prompt",
            "result": "success",
            "src": "object_different_prompt/object_task01_episode00_pick_up_the_cream_cheese_and_place_it_in_the_basket_prompt_blank_success.mp4",
            "notes": "Object success remains 60/100 under the muted prompt condition."
          },
          {
            "title": "\u201cDon\u2019t do anything\u201d",
            "caption": "Contradictory prompt on the same cream-cheese task.",
            "model": "pi05",
            "suite": "object",
            "condition": "do_nothing",
            "task_id": 1,
            "prompt_text": "Don't do anything",
            "prompt_label": "contradictory prompt",
            "result": "success",
            "src": "object_different_prompt/object_task01_episode00_pick_up_the_cream_cheese_and_place_it_in_the_basket_prompt_Don_t_do_anything_success.mp4",
            "notes": "The arm still executes the original manipulation behavior."
          },
          {
            "title": "Wrong object prompt",
            "caption": "Prompt edited to \u201cpick up the milk and place it in the basket.\u201d",
            "model": "pi05",
            "suite": "object",
            "condition": "wrong_object",
            "task_id": 1,
            "prompt_text": "pick up the milk and place it in the basket",
            "prompt_label": "wrong-object prompt",
            "result": "failure",
            "src": "object_different_prompt/object_task01_episode00_pick_up_the_cream_cheese_and_place_it_in_the_basket_prompt_pick_up_the_milk_and_place_it_in_the_basket_failure.mp4",
            "notes": "The prompt changes, but the behavior does not reliably re-ground to the newly named object."
          }
        ]
      }
    ],
    "shortcuts": [
      {
        "title": "Cream-cheese task under scene perturbation",
        "caption": "This row focuses on positional shortcutting. The baseline succeeds, but once the scene is perturbed the model follows the target slot rather than robust object identity.",
        "model": "pi05",
        "suite": "object",
        "videos": [
          {
            "title": "Baseline scene",
            "caption": "Original cream-cheese task and original layout.",
            "model": "pi05",
            "suite": "object",
            "condition": "task",
            "task_id": 1,
            "prompt_text": "pick up the cream cheese and place it in the basket",
            "prompt_label": "baseline",
            "result": "success",
            "src": "object_baseline/rollout_pick_up_the_cream_cheese_and_place_it_in_the_basket_success.mp4",
            "notes": "The cream cheese starts in the task\u2019s designated target region."
          },
          {
            "title": "Perturbed scene, same prompt",
            "caption": "Original cream-cheese prompt after the milk / cream-cheese layout probe.",
            "model": "pi05",
            "suite": "object",
            "condition": "scene_probe",
            "task_id": 1,
            "prompt_text": "pick up the cream cheese and place it in the basket",
            "prompt_label": "scene perturbation",
            "result": "failure",
            "src": "object_different_prompt/object_task01_episode00_pick_up_the_cream_cheese_and_place_it_in_the_basket_prompt_pick_up_the_cream_cheese_and_place_it_in_the_basket_failure.mp4",
            "notes": "The success metric fails even though the scene perturbation still presents a salient \u201ctarget\u201d slot."
          },
          {
            "title": "Seeded shuffle: failure case",
            "caption": "Full object shuffle, trial 0 for the cream-cheese task.",
            "model": "pi05",
            "suite": "object",
            "condition": "shuffle",
            "task_id": 1,
            "prompt_text": "pick up the cream cheese and place it in the basket",
            "prompt_label": "shuffle failure",
            "result": "failure",
            "src": "shuffle_test/shuffle_task01_trial00_episode26_pick_up_the_cream_cheese_and_place_it_in_the_basket_prompt_pick_up_the_cream_cheese_and_place_it_in_failure.mp4",
            "notes": "Object success drops to 23/100 under seeded shuffles."
          },
          {
            "title": "Seeded shuffle: success case",
            "caption": "Full object shuffle, trial 3 for the cream-cheese task.",
            "model": "pi05",
            "suite": "object",
            "condition": "shuffle",
            "task_id": 1,
            "prompt_text": "pick up the cream cheese and place it in the basket",
            "prompt_label": "shuffle success",
            "result": "success",
            "src": "shuffle_test/shuffle_task01_trial03_episode02_pick_up_the_cream_cheese_and_place_it_in_the_basket_prompt_pick_up_the_cream_cheese_and_place_it_in_success.mp4",
            "notes": "The behavior becomes brittle and highly layout-dependent."
          }
        ]
      }
    ],
    "composition": [
      {
        "title": "Same-scene edited prompts on pi0.5 Goal task 0",
        "caption": "All three videos use the same underlying Goal scene. Only the prompt changes.",
        "model": "pi05",
        "suite": "goal",
        "videos": [
          {
            "title": "Drawer + bowl-inside edit",
            "caption": "Prompt: \u201copen the middle drawer and put the bowl inside.\u201d",
            "model": "pi05",
            "suite": "goal",
            "condition": "custom",
            "task_id": 0,
            "prompt_text": "open the middle drawer and put the bowl inside",
            "prompt_label": "edited prompt",
            "result": "failure",
            "src": "goal_different_prompt/goal_task00_episode00_open_the_middle_drawer_of_the_cabinet_prompt_open_the_middle_drawer_and_put_the_bowl_inside_failure.mp4",
            "notes": "The model falls back to a memorized top-drawer behavior."
          },
          {
            "title": "Wine bottle on stove",
            "caption": "Prompt: \u201cput the wine bottle on the stove.\u201d",
            "model": "pi05",
            "suite": "goal",
            "condition": "custom",
            "task_id": 0,
            "prompt_text": "put the wine bottle on the stove",
            "prompt_label": "edited prompt",
            "result": "failure",
            "src": "goal_different_prompt/goal_task00_episode00_open_the_middle_drawer_of_the_cabinet_prompt_put_the_wine_bottle_on_the_stove_failure.mp4",
            "notes": "The requested object-goal combination is not composed robustly."
          },
          {
            "title": "\u201ccream cheese stove\u201d",
            "caption": "Prompt compressed into a short compositional fragment.",
            "model": "pi05",
            "suite": "goal",
            "condition": "custom",
            "task_id": 0,
            "prompt_text": "cream cheese stove",
            "prompt_label": "edited prompt",
            "result": "failure",
            "src": "goal_different_prompt/goal_task00_episode00_open_the_middle_drawer_of_the_cabinet_prompt_cream_cheese_stove_failure.mp4",
            "notes": "The result looks like shallow recombination of known actions rather than grounded interpretation."
          }
        ]
      }
    ]
  },
  "artifact_groups": [
    {
      "title": "OpenVLA-OFT Goal prompt trio",
      "description": "Curated same-scene Goal comparison for the combined OpenVLA-OFT checkpoint.",
      "files": [
        {
          "name": "do_nothing.mp4",
          "src": "openvla_goal/do_nothing.mp4"
        },
        {
          "name": "empty.mp4",
          "src": "openvla_goal/empty.mp4"
        },
        {
          "name": "task.mp4",
          "src": "openvla_goal/task.mp4"
        }
      ]
    },
    {
      "title": "OpenVLA-OFT Object prompt trio",
      "description": "Curated Object-task comparison showing that success persists under empty and contradictory prompts.",
      "files": [
        {
          "name": "do_nothing.mp4",
          "src": "openvla_object/do_nothing.mp4"
        },
        {
          "name": "empty.mp4",
          "src": "openvla_object/empty.mp4"
        },
        {
          "name": "task.mp4",
          "src": "openvla_object/task.mp4"
        }
      ]
    },
    {
      "title": "OpenVLA-OFT Spatial prompt trio",
      "description": "Curated Spatial-task comparison showing that much of the behavior survives prompt removal.",
      "files": [
        {
          "name": "do_nothing.mp4",
          "src": "openvla_spatial/do_nothing.mp4"
        },
        {
          "name": "empty.mp4",
          "src": "openvla_spatial/empty.mp4"
        },
        {
          "name": "task.mp4",
          "src": "openvla_spatial/task.mp4"
        }
      ]
    },
    {
      "title": "pi0.5 Spatial baseline clips",
      "description": "Single baseline rollout for each of the 10 Spatial tasks.",
      "files": [
        {
          "name": "rollout_pick_up_the_black_bowl_between_the_plate_and_the_ramekin_and_place_it_on_the_plate_success.mp4",
          "src": "spatial_baseline/rollout_pick_up_the_black_bowl_between_the_plate_and_the_ramekin_and_place_it_on_the_plate_success.mp4"
        },
        {
          "name": "rollout_pick_up_the_black_bowl_from_table_center_and_place_it_on_the_plate_success.mp4",
          "src": "spatial_baseline/rollout_pick_up_the_black_bowl_from_table_center_and_place_it_on_the_plate_success.mp4"
        },
        {
          "name": "rollout_pick_up_the_black_bowl_in_the_top_drawer_of_the_wooden_cabinet_and_place_it_on_the_plate_success.mp4",
          "src": "spatial_baseline/rollout_pick_up_the_black_bowl_in_the_top_drawer_of_the_wooden_cabinet_and_place_it_on_the_plate_success.mp4"
        },
        {
          "name": "rollout_pick_up_the_black_bowl_next_to_the_cookie_box_and_place_it_on_the_plate_success.mp4",
          "src": "spatial_baseline/rollout_pick_up_the_black_bowl_next_to_the_cookie_box_and_place_it_on_the_plate_success.mp4"
        },
        {
          "name": "rollout_pick_up_the_black_bowl_next_to_the_plate_and_place_it_on_the_plate_success.mp4",
          "src": "spatial_baseline/rollout_pick_up_the_black_bowl_next_to_the_plate_and_place_it_on_the_plate_success.mp4"
        },
        {
          "name": "rollout_pick_up_the_black_bowl_next_to_the_ramekin_and_place_it_on_the_plate_success.mp4",
          "src": "spatial_baseline/rollout_pick_up_the_black_bowl_next_to_the_ramekin_and_place_it_on_the_plate_success.mp4"
        },
        {
          "name": "rollout_pick_up_the_black_bowl_on_the_cookie_box_and_place_it_on_the_plate_success.mp4",
          "src": "spatial_baseline/rollout_pick_up_the_black_bowl_on_the_cookie_box_and_place_it_on_the_plate_success.mp4"
        },
        {
          "name": "rollout_pick_up_the_black_bowl_on_the_ramekin_and_place_it_on_the_plate_success.mp4",
          "src": "spatial_baseline/rollout_pick_up_the_black_bowl_on_the_ramekin_and_place_it_on_the_plate_success.mp4"
        },
        {
          "name": "rollout_pick_up_the_black_bowl_on_the_stove_and_place_it_on_the_plate_success.mp4",
          "src": "spatial_baseline/rollout_pick_up_the_black_bowl_on_the_stove_and_place_it_on_the_plate_success.mp4"
        },
        {
          "name": "rollout_pick_up_the_black_bowl_on_the_wooden_cabinet_and_place_it_on_the_plate_success.mp4",
          "src": "spatial_baseline/rollout_pick_up_the_black_bowl_on_the_wooden_cabinet_and_place_it_on_the_plate_success.mp4"
        }
      ]
    },
    {
      "title": "pi0.5 Object baseline clips",
      "description": "Single baseline rollout for each of the 10 Object tasks.",
      "files": [
        {
          "name": "rollout_pick_up_the_alphabet_soup_and_place_it_in_the_basket_success.mp4",
          "src": "object_baseline/rollout_pick_up_the_alphabet_soup_and_place_it_in_the_basket_success.mp4"
        },
        {
          "name": "rollout_pick_up_the_bbq_sauce_and_place_it_in_the_basket_success.mp4",
          "src": "object_baseline/rollout_pick_up_the_bbq_sauce_and_place_it_in_the_basket_success.mp4"
        },
        {
          "name": "rollout_pick_up_the_butter_and_place_it_in_the_basket_success.mp4",
          "src": "object_baseline/rollout_pick_up_the_butter_and_place_it_in_the_basket_success.mp4"
        },
        {
          "name": "rollout_pick_up_the_chocolate_pudding_and_place_it_in_the_basket_success.mp4",
          "src": "object_baseline/rollout_pick_up_the_chocolate_pudding_and_place_it_in_the_basket_success.mp4"
        },
        {
          "name": "rollout_pick_up_the_cream_cheese_and_place_it_in_the_basket_success.mp4",
          "src": "object_baseline/rollout_pick_up_the_cream_cheese_and_place_it_in_the_basket_success.mp4"
        },
        {
          "name": "rollout_pick_up_the_ketchup_and_place_it_in_the_basket_success.mp4",
          "src": "object_baseline/rollout_pick_up_the_ketchup_and_place_it_in_the_basket_success.mp4"
        },
        {
          "name": "rollout_pick_up_the_milk_and_place_it_in_the_basket_success.mp4",
          "src": "object_baseline/rollout_pick_up_the_milk_and_place_it_in_the_basket_success.mp4"
        },
        {
          "name": "rollout_pick_up_the_orange_juice_and_place_it_in_the_basket_success.mp4",
          "src": "object_baseline/rollout_pick_up_the_orange_juice_and_place_it_in_the_basket_success.mp4"
        },
        {
          "name": "rollout_pick_up_the_salad_dressing_and_place_it_in_the_basket_success.mp4",
          "src": "object_baseline/rollout_pick_up_the_salad_dressing_and_place_it_in_the_basket_success.mp4"
        },
        {
          "name": "rollout_pick_up_the_tomato_sauce_and_place_it_in_the_basket_success.mp4",
          "src": "object_baseline/rollout_pick_up_the_tomato_sauce_and_place_it_in_the_basket_success.mp4"
        }
      ]
    },
    {
      "title": "pi0.5 Goal baseline clips",
      "description": "Single baseline rollout for Goal tasks in the shared kitchen scene.",
      "files": [
        {
          "name": "rollout_open_the_middle_drawer_of_the_cabinet_success.mp4",
          "src": "goal_baseline/rollout_open_the_middle_drawer_of_the_cabinet_success.mp4"
        },
        {
          "name": "rollout_open_the_top_drawer_and_put_the_bowl_inside_success.mp4",
          "src": "goal_baseline/rollout_open_the_top_drawer_and_put_the_bowl_inside_success.mp4"
        },
        {
          "name": "rollout_pick_up_the_alphabet_soup_and_place_it_in_the_basket_success.mp4",
          "src": "goal_baseline/rollout_pick_up_the_alphabet_soup_and_place_it_in_the_basket_success.mp4"
        },
        {
          "name": "rollout_push_the_plate_to_the_front_of_the_stove_success.mp4",
          "src": "goal_baseline/rollout_push_the_plate_to_the_front_of_the_stove_success.mp4"
        },
        {
          "name": "rollout_put_the_bowl_on_the_plate_success.mp4",
          "src": "goal_baseline/rollout_put_the_bowl_on_the_plate_success.mp4"
        },
        {
          "name": "rollout_put_the_bowl_on_the_stove_success.mp4",
          "src": "goal_baseline/rollout_put_the_bowl_on_the_stove_success.mp4"
        },
        {
          "name": "rollout_put_the_bowl_on_top_of_the_cabinet_success.mp4",
          "src": "goal_baseline/rollout_put_the_bowl_on_top_of_the_cabinet_success.mp4"
        },
        {
          "name": "rollout_put_the_cream_cheese_in_the_bowl_success.mp4",
          "src": "goal_baseline/rollout_put_the_cream_cheese_in_the_bowl_success.mp4"
        },
        {
          "name": "rollout_put_the_wine_bottle_on_the_rack_success.mp4",
          "src": "goal_baseline/rollout_put_the_wine_bottle_on_the_rack_success.mp4"
        },
        {
          "name": "rollout_put_the_wine_bottle_on_top_of_the_cabinet_success.mp4",
          "src": "goal_baseline/rollout_put_the_wine_bottle_on_top_of_the_cabinet_success.mp4"
        },
        {
          "name": "rollout_turn_on_the_stove_success.mp4",
          "src": "goal_baseline/rollout_turn_on_the_stove_success.mp4"
        }
      ]
    },
    {
      "title": "pi0.5 Goal muted-prompt runs",
      "description": "Five episodes per Goal task using a blank-space prompt on the client side.",
      "files": [
        {
          "name": "task00_episode00_open_the_middle_drawer_of_the_cabinet_failure.mp4",
          "src": "goal_empty_prompt/task00_episode00_open_the_middle_drawer_of_the_cabinet_failure.mp4"
        },
        {
          "name": "task00_episode01_open_the_middle_drawer_of_the_cabinet_failure.mp4",
          "src": "goal_empty_prompt/task00_episode01_open_the_middle_drawer_of_the_cabinet_failure.mp4"
        },
        {
          "name": "task00_episode02_open_the_middle_drawer_of_the_cabinet_failure.mp4",
          "src": "goal_empty_prompt/task00_episode02_open_the_middle_drawer_of_the_cabinet_failure.mp4"
        },
        {
          "name": "task00_episode03_open_the_middle_drawer_of_the_cabinet_failure.mp4",
          "src": "goal_empty_prompt/task00_episode03_open_the_middle_drawer_of_the_cabinet_failure.mp4"
        },
        {
          "name": "task00_episode04_open_the_middle_drawer_of_the_cabinet_failure.mp4",
          "src": "goal_empty_prompt/task00_episode04_open_the_middle_drawer_of_the_cabinet_failure.mp4"
        },
        {
          "name": "task01_episode00_put_the_bowl_on_the_stove_failure.mp4",
          "src": "goal_empty_prompt/task01_episode00_put_the_bowl_on_the_stove_failure.mp4"
        },
        {
          "name": "task01_episode01_put_the_bowl_on_the_stove_failure.mp4",
          "src": "goal_empty_prompt/task01_episode01_put_the_bowl_on_the_stove_failure.mp4"
        },
        {
          "name": "task01_episode02_put_the_bowl_on_the_stove_failure.mp4",
          "src": "goal_empty_prompt/task01_episode02_put_the_bowl_on_the_stove_failure.mp4"
        },
        {
          "name": "task01_episode03_put_the_bowl_on_the_stove_failure.mp4",
          "src": "goal_empty_prompt/task01_episode03_put_the_bowl_on_the_stove_failure.mp4"
        },
        {
          "name": "task01_episode04_put_the_bowl_on_the_stove_success.mp4",
          "src": "goal_empty_prompt/task01_episode04_put_the_bowl_on_the_stove_success.mp4"
        },
        {
          "name": "task02_episode00_put_the_wine_bottle_on_top_of_the_cabinet_failure.mp4",
          "src": "goal_empty_prompt/task02_episode00_put_the_wine_bottle_on_top_of_the_cabinet_failure.mp4"
        },
        {
          "name": "task02_episode01_put_the_wine_bottle_on_top_of_the_cabinet_failure.mp4",
          "src": "goal_empty_prompt/task02_episode01_put_the_wine_bottle_on_top_of_the_cabinet_failure.mp4"
        },
        {
          "name": "task02_episode02_put_the_wine_bottle_on_top_of_the_cabinet_failure.mp4",
          "src": "goal_empty_prompt/task02_episode02_put_the_wine_bottle_on_top_of_the_cabinet_failure.mp4"
        },
        {
          "name": "task02_episode03_put_the_wine_bottle_on_top_of_the_cabinet_failure.mp4",
          "src": "goal_empty_prompt/task02_episode03_put_the_wine_bottle_on_top_of_the_cabinet_failure.mp4"
        },
        {
          "name": "task02_episode04_put_the_wine_bottle_on_top_of_the_cabinet_failure.mp4",
          "src": "goal_empty_prompt/task02_episode04_put_the_wine_bottle_on_top_of_the_cabinet_failure.mp4"
        },
        {
          "name": "task03_episode00_open_the_top_drawer_and_put_the_bowl_inside_failure.mp4",
          "src": "goal_empty_prompt/task03_episode00_open_the_top_drawer_and_put_the_bowl_inside_failure.mp4"
        },
        {
          "name": "task03_episode01_open_the_top_drawer_and_put_the_bowl_inside_failure.mp4",
          "src": "goal_empty_prompt/task03_episode01_open_the_top_drawer_and_put_the_bowl_inside_failure.mp4"
        },
        {
          "name": "task03_episode02_open_the_top_drawer_and_put_the_bowl_inside_failure.mp4",
          "src": "goal_empty_prompt/task03_episode02_open_the_top_drawer_and_put_the_bowl_inside_failure.mp4"
        },
        {
          "name": "task03_episode03_open_the_top_drawer_and_put_the_bowl_inside_failure.mp4",
          "src": "goal_empty_prompt/task03_episode03_open_the_top_drawer_and_put_the_bowl_inside_failure.mp4"
        },
        {
          "name": "task03_episode04_open_the_top_drawer_and_put_the_bowl_inside_failure.mp4",
          "src": "goal_empty_prompt/task03_episode04_open_the_top_drawer_and_put_the_bowl_inside_failure.mp4"
        },
        {
          "name": "task04_episode00_put_the_bowl_on_top_of_the_cabinet_failure.mp4",
          "src": "goal_empty_prompt/task04_episode00_put_the_bowl_on_top_of_the_cabinet_failure.mp4"
        },
        {
          "name": "task04_episode01_put_the_bowl_on_top_of_the_cabinet_failure.mp4",
          "src": "goal_empty_prompt/task04_episode01_put_the_bowl_on_top_of_the_cabinet_failure.mp4"
        },
        {
          "name": "task04_episode02_put_the_bowl_on_top_of_the_cabinet_failure.mp4",
          "src": "goal_empty_prompt/task04_episode02_put_the_bowl_on_top_of_the_cabinet_failure.mp4"
        },
        {
          "name": "task04_episode03_put_the_bowl_on_top_of_the_cabinet_failure.mp4",
          "src": "goal_empty_prompt/task04_episode03_put_the_bowl_on_top_of_the_cabinet_failure.mp4"
        },
        {
          "name": "task04_episode04_put_the_bowl_on_top_of_the_cabinet_failure.mp4",
          "src": "goal_empty_prompt/task04_episode04_put_the_bowl_on_top_of_the_cabinet_failure.mp4"
        },
        {
          "name": "task05_episode00_push_the_plate_to_the_front_of_the_stove_failure.mp4",
          "src": "goal_empty_prompt/task05_episode00_push_the_plate_to_the_front_of_the_stove_failure.mp4"
        },
        {
          "name": "task05_episode01_push_the_plate_to_the_front_of_the_stove_failure.mp4",
          "src": "goal_empty_prompt/task05_episode01_push_the_plate_to_the_front_of_the_stove_failure.mp4"
        },
        {
          "name": "task05_episode02_push_the_plate_to_the_front_of_the_stove_failure.mp4",
          "src": "goal_empty_prompt/task05_episode02_push_the_plate_to_the_front_of_the_stove_failure.mp4"
        },
        {
          "name": "task05_episode03_push_the_plate_to_the_front_of_the_stove_failure.mp4",
          "src": "goal_empty_prompt/task05_episode03_push_the_plate_to_the_front_of_the_stove_failure.mp4"
        },
        {
          "name": "task05_episode04_push_the_plate_to_the_front_of_the_stove_failure.mp4",
          "src": "goal_empty_prompt/task05_episode04_push_the_plate_to_the_front_of_the_stove_failure.mp4"
        },
        {
          "name": "task06_episode00_put_the_cream_cheese_in_the_bowl_failure.mp4",
          "src": "goal_empty_prompt/task06_episode00_put_the_cream_cheese_in_the_bowl_failure.mp4"
        },
        {
          "name": "task06_episode01_put_the_cream_cheese_in_the_bowl_failure.mp4",
          "src": "goal_empty_prompt/task06_episode01_put_the_cream_cheese_in_the_bowl_failure.mp4"
        },
        {
          "name": "task06_episode02_put_the_cream_cheese_in_the_bowl_failure.mp4",
          "src": "goal_empty_prompt/task06_episode02_put_the_cream_cheese_in_the_bowl_failure.mp4"
        },
        {
          "name": "task06_episode03_put_the_cream_cheese_in_the_bowl_failure.mp4",
          "src": "goal_empty_prompt/task06_episode03_put_the_cream_cheese_in_the_bowl_failure.mp4"
        },
        {
          "name": "task06_episode04_put_the_cream_cheese_in_the_bowl_failure.mp4",
          "src": "goal_empty_prompt/task06_episode04_put_the_cream_cheese_in_the_bowl_failure.mp4"
        },
        {
          "name": "task07_episode00_turn_on_the_stove_failure.mp4",
          "src": "goal_empty_prompt/task07_episode00_turn_on_the_stove_failure.mp4"
        },
        {
          "name": "task07_episode01_turn_on_the_stove_failure.mp4",
          "src": "goal_empty_prompt/task07_episode01_turn_on_the_stove_failure.mp4"
        },
        {
          "name": "task07_episode02_turn_on_the_stove_failure.mp4",
          "src": "goal_empty_prompt/task07_episode02_turn_on_the_stove_failure.mp4"
        },
        {
          "name": "task07_episode03_turn_on_the_stove_failure.mp4",
          "src": "goal_empty_prompt/task07_episode03_turn_on_the_stove_failure.mp4"
        },
        {
          "name": "task07_episode04_turn_on_the_stove_failure.mp4",
          "src": "goal_empty_prompt/task07_episode04_turn_on_the_stove_failure.mp4"
        },
        {
          "name": "task08_episode00_put_the_bowl_on_the_plate_failure.mp4",
          "src": "goal_empty_prompt/task08_episode00_put_the_bowl_on_the_plate_failure.mp4"
        },
        {
          "name": "task08_episode01_put_the_bowl_on_the_plate_failure.mp4",
          "src": "goal_empty_prompt/task08_episode01_put_the_bowl_on_the_plate_failure.mp4"
        },
        {
          "name": "task08_episode02_put_the_bowl_on_the_plate_failure.mp4",
          "src": "goal_empty_prompt/task08_episode02_put_the_bowl_on_the_plate_failure.mp4"
        },
        {
          "name": "task08_episode03_put_the_bowl_on_the_plate_success.mp4",
          "src": "goal_empty_prompt/task08_episode03_put_the_bowl_on_the_plate_success.mp4"
        },
        {
          "name": "task08_episode04_put_the_bowl_on_the_plate_success.mp4",
          "src": "goal_empty_prompt/task08_episode04_put_the_bowl_on_the_plate_success.mp4"
        },
        {
          "name": "task09_episode00_put_the_wine_bottle_on_the_rack_failure.mp4",
          "src": "goal_empty_prompt/task09_episode00_put_the_wine_bottle_on_the_rack_failure.mp4"
        },
        {
          "name": "task09_episode01_put_the_wine_bottle_on_the_rack_failure.mp4",
          "src": "goal_empty_prompt/task09_episode01_put_the_wine_bottle_on_the_rack_failure.mp4"
        },
        {
          "name": "task09_episode02_put_the_wine_bottle_on_the_rack_failure.mp4",
          "src": "goal_empty_prompt/task09_episode02_put_the_wine_bottle_on_the_rack_failure.mp4"
        },
        {
          "name": "task09_episode03_put_the_wine_bottle_on_the_rack_failure.mp4",
          "src": "goal_empty_prompt/task09_episode03_put_the_wine_bottle_on_the_rack_failure.mp4"
        },
        {
          "name": "task09_episode04_put_the_wine_bottle_on_the_rack_failure.mp4",
          "src": "goal_empty_prompt/task09_episode04_put_the_wine_bottle_on_the_rack_failure.mp4"
        }
      ]
    },
    {
      "title": "pi0.5 Goal edited-prompt probes",
      "description": "Custom prompt edits on the shared Goal scene to probe compositional behavior.",
      "files": [
        {
          "name": "goal_task00_episode00_open_the_middle_drawer_of_the_cabinet_prompt_cream_cheese_stove_failure.mp4",
          "src": "goal_different_prompt/goal_task00_episode00_open_the_middle_drawer_of_the_cabinet_prompt_cream_cheese_stove_failure.mp4"
        },
        {
          "name": "goal_task00_episode00_open_the_middle_drawer_of_the_cabinet_prompt_don_t_do_anything_failure.mp4",
          "src": "goal_different_prompt/goal_task00_episode00_open_the_middle_drawer_of_the_cabinet_prompt_don_t_do_anything_failure.mp4"
        },
        {
          "name": "goal_task00_episode00_open_the_middle_drawer_of_the_cabinet_prompt_move_the_bowl_onto_the_stove_failure.mp4",
          "src": "goal_different_prompt/goal_task00_episode00_open_the_middle_drawer_of_the_cabinet_prompt_move_the_bowl_onto_the_stove_failure.mp4"
        },
        {
          "name": "goal_task00_episode00_open_the_middle_drawer_of_the_cabinet_prompt_move_the_bowl_to_the_front_of_the_stove_failure.mp4",
          "src": "goal_different_prompt/goal_task00_episode00_open_the_middle_drawer_of_the_cabinet_prompt_move_the_bowl_to_the_front_of_the_stove_failure.mp4"
        },
        {
          "name": "goal_task00_episode00_open_the_middle_drawer_of_the_cabinet_prompt_open_and_put_inside_failure.mp4",
          "src": "goal_different_prompt/goal_task00_episode00_open_the_middle_drawer_of_the_cabinet_prompt_open_and_put_inside_failure.mp4"
        },
        {
          "name": "goal_task00_episode00_open_the_middle_drawer_of_the_cabinet_prompt_open_the_middle_drawer_and_put_the_bowl_inside_failure.mp4",
          "src": "goal_different_prompt/goal_task00_episode00_open_the_middle_drawer_of_the_cabinet_prompt_open_the_middle_drawer_and_put_the_bowl_inside_failure.mp4"
        },
        {
          "name": "goal_task00_episode00_open_the_middle_drawer_of_the_cabinet_prompt_put_the_stove_on_to_the_plate_failure.mp4",
          "src": "goal_different_prompt/goal_task00_episode00_open_the_middle_drawer_of_the_cabinet_prompt_put_the_stove_on_to_the_plate_failure.mp4"
        },
        {
          "name": "goal_task00_episode00_open_the_middle_drawer_of_the_cabinet_prompt_put_the_wine_bottle_on_the_stove_failure.mp4",
          "src": "goal_different_prompt/goal_task00_episode00_open_the_middle_drawer_of_the_cabinet_prompt_put_the_wine_bottle_on_the_stove_failure.mp4"
        },
        {
          "name": "goal_task00_episode00_open_the_middle_drawer_of_the_cabinet_prompt_turn_on_the_stove_and_put_the_cream_cheese_on_the_stove_failure.mp4",
          "src": "goal_different_prompt/goal_task00_episode00_open_the_middle_drawer_of_the_cabinet_prompt_turn_on_the_stove_and_put_the_cream_cheese_on_the_stove_failure.mp4"
        }
      ]
    },
    {
      "title": "pi0.5 Object prompt probes",
      "description": "Cream-cheese task probed with blank, contradictory, and wrong-object prompts.",
      "files": [
        {
          "name": "object_task01_episode00_pick_up_the_cream_cheese_and_place_it_in_the_basket_prompt_Don_t_do_anything_success.mp4",
          "src": "object_different_prompt/object_task01_episode00_pick_up_the_cream_cheese_and_place_it_in_the_basket_prompt_Don_t_do_anything_success.mp4"
        },
        {
          "name": "object_task01_episode00_pick_up_the_cream_cheese_and_place_it_in_the_basket_prompt_blank_failure.mp4",
          "src": "object_different_prompt/object_task01_episode00_pick_up_the_cream_cheese_and_place_it_in_the_basket_prompt_blank_failure.mp4"
        },
        {
          "name": "object_task01_episode00_pick_up_the_cream_cheese_and_place_it_in_the_basket_prompt_blank_success.mp4",
          "src": "object_different_prompt/object_task01_episode00_pick_up_the_cream_cheese_and_place_it_in_the_basket_prompt_blank_success.mp4"
        },
        {
          "name": "object_task01_episode00_pick_up_the_cream_cheese_and_place_it_in_the_basket_prompt_pick_up_the_alphabet_soup_and_place_it_in_the_basket_failure.mp4",
          "src": "object_different_prompt/object_task01_episode00_pick_up_the_cream_cheese_and_place_it_in_the_basket_prompt_pick_up_the_alphabet_soup_and_place_it_in_the_basket_failure.mp4"
        },
        {
          "name": "object_task01_episode00_pick_up_the_cream_cheese_and_place_it_in_the_basket_prompt_pick_up_the_cream_cheese_and_place_it_in_the_basket_failure.mp4",
          "src": "object_different_prompt/object_task01_episode00_pick_up_the_cream_cheese_and_place_it_in_the_basket_prompt_pick_up_the_cream_cheese_and_place_it_in_the_basket_failure.mp4"
        },
        {
          "name": "object_task01_episode00_pick_up_the_cream_cheese_and_place_it_in_the_basket_prompt_pick_up_the_milk_and_place_it_in_the_basket_failure.mp4",
          "src": "object_different_prompt/object_task01_episode00_pick_up_the_cream_cheese_and_place_it_in_the_basket_prompt_pick_up_the_milk_and_place_it_in_the_basket_failure.mp4"
        },
        {
          "name": "object_task01_episode00_pick_up_the_cream_cheese_and_place_it_in_the_basket_prompt_pick_up_the_tomato_sauce_and_place_it_in_the_basket_failure.mp4",
          "src": "object_different_prompt/object_task01_episode00_pick_up_the_cream_cheese_and_place_it_in_the_basket_prompt_pick_up_the_tomato_sauce_and_place_it_in_the_basket_failure.mp4"
        },
        {
          "name": "object_task01_episode01_pick_up_the_cream_cheese_and_place_it_in_the_basket_prompt_blank_failure.mp4",
          "src": "object_different_prompt/object_task01_episode01_pick_up_the_cream_cheese_and_place_it_in_the_basket_prompt_blank_failure.mp4"
        },
        {
          "name": "object_task01_episode01_pick_up_the_cream_cheese_and_place_it_in_the_basket_prompt_pick_up_the_milk_and_place_it_in_the_basket_failure.mp4",
          "src": "object_different_prompt/object_task01_episode01_pick_up_the_cream_cheese_and_place_it_in_the_basket_prompt_pick_up_the_milk_and_place_it_in_the_basket_failure.mp4"
        },
        {
          "name": "object_task01_episode01_pick_up_the_cream_cheese_and_place_it_in_the_basket_prompt_pick_up_the_tomato_sauce_and_place_it_in_the_basket_failure.mp4",
          "src": "object_different_prompt/object_task01_episode01_pick_up_the_cream_cheese_and_place_it_in_the_basket_prompt_pick_up_the_tomato_sauce_and_place_it_in_the_basket_failure.mp4"
        },
        {
          "name": "object_task01_episode02_pick_up_the_cream_cheese_and_place_it_in_the_basket_prompt_blank_failure.mp4",
          "src": "object_different_prompt/object_task01_episode02_pick_up_the_cream_cheese_and_place_it_in_the_basket_prompt_blank_failure.mp4"
        },
        {
          "name": "object_task01_episode02_pick_up_the_cream_cheese_and_place_it_in_the_basket_prompt_pick_up_the_milk_and_place_it_in_the_basket_failure.mp4",
          "src": "object_different_prompt/object_task01_episode02_pick_up_the_cream_cheese_and_place_it_in_the_basket_prompt_pick_up_the_milk_and_place_it_in_the_basket_failure.mp4"
        },
        {
          "name": "object_task01_episode02_pick_up_the_cream_cheese_and_place_it_in_the_basket_prompt_pick_up_the_tomato_sauce_and_place_it_in_the_basket_failure.mp4",
          "src": "object_different_prompt/object_task01_episode02_pick_up_the_cream_cheese_and_place_it_in_the_basket_prompt_pick_up_the_tomato_sauce_and_place_it_in_the_basket_failure.mp4"
        },
        {
          "name": "object_task01_episode03_pick_up_the_cream_cheese_and_place_it_in_the_basket_prompt_pick_up_the_milk_and_place_it_in_the_basket_failure.mp4",
          "src": "object_different_prompt/object_task01_episode03_pick_up_the_cream_cheese_and_place_it_in_the_basket_prompt_pick_up_the_milk_and_place_it_in_the_basket_failure.mp4"
        },
        {
          "name": "object_task01_episode03_pick_up_the_cream_cheese_and_place_it_in_the_basket_prompt_pick_up_the_tomato_sauce_and_place_it_in_the_basket_failure.mp4",
          "src": "object_different_prompt/object_task01_episode03_pick_up_the_cream_cheese_and_place_it_in_the_basket_prompt_pick_up_the_tomato_sauce_and_place_it_in_the_basket_failure.mp4"
        },
        {
          "name": "object_task01_episode04_pick_up_the_cream_cheese_and_place_it_in_the_basket_prompt_pick_up_the_milk_and_place_it_in_the_basket_failure.mp4",
          "src": "object_different_prompt/object_task01_episode04_pick_up_the_cream_cheese_and_place_it_in_the_basket_prompt_pick_up_the_milk_and_place_it_in_the_basket_failure.mp4"
        },
        {
          "name": "object_task01_episode04_pick_up_the_cream_cheese_and_place_it_in_the_basket_prompt_pick_up_the_tomato_sauce_and_place_it_in_the_basket_failure.mp4",
          "src": "object_different_prompt/object_task01_episode04_pick_up_the_cream_cheese_and_place_it_in_the_basket_prompt_pick_up_the_tomato_sauce_and_place_it_in_the_basket_failure.mp4"
        }
      ]
    },
    {
      "title": "pi0.5 shuffled Object scenes",
      "description": "Seeded planar permutations of the six movable grocery objects across all 10 Object tasks.",
      "files": [
        {
          "name": "shuffle_task00_trial00_episode26_pick_up_the_alphabet_soup_and_place_it_in_the_basket_prompt_pick_up_the_alphabet_soup_and_place_it_i_failure.mp4",
          "src": "shuffle_test/shuffle_task00_trial00_episode26_pick_up_the_alphabet_soup_and_place_it_in_the_basket_prompt_pick_up_the_alphabet_soup_and_place_it_i_failure.mp4"
        },
        {
          "name": "shuffle_task00_trial01_episode39_pick_up_the_alphabet_soup_and_place_it_in_the_basket_prompt_pick_up_the_alphabet_soup_and_place_it_i_failure.mp4",
          "src": "shuffle_test/shuffle_task00_trial01_episode39_pick_up_the_alphabet_soup_and_place_it_in_the_basket_prompt_pick_up_the_alphabet_soup_and_place_it_i_failure.mp4"
        },
        {
          "name": "shuffle_task00_trial02_episode35_pick_up_the_alphabet_soup_and_place_it_in_the_basket_prompt_pick_up_the_alphabet_soup_and_place_it_i_success.mp4",
          "src": "shuffle_test/shuffle_task00_trial02_episode35_pick_up_the_alphabet_soup_and_place_it_in_the_basket_prompt_pick_up_the_alphabet_soup_and_place_it_i_success.mp4"
        },
        {
          "name": "shuffle_task00_trial03_episode46_pick_up_the_alphabet_soup_and_place_it_in_the_basket_prompt_pick_up_the_alphabet_soup_and_place_it_i_success.mp4",
          "src": "shuffle_test/shuffle_task00_trial03_episode46_pick_up_the_alphabet_soup_and_place_it_in_the_basket_prompt_pick_up_the_alphabet_soup_and_place_it_i_success.mp4"
        },
        {
          "name": "shuffle_task00_trial04_episode44_pick_up_the_alphabet_soup_and_place_it_in_the_basket_prompt_pick_up_the_alphabet_soup_and_place_it_i_success.mp4",
          "src": "shuffle_test/shuffle_task00_trial04_episode44_pick_up_the_alphabet_soup_and_place_it_in_the_basket_prompt_pick_up_the_alphabet_soup_and_place_it_i_success.mp4"
        },
        {
          "name": "shuffle_task00_trial05_episode15_pick_up_the_alphabet_soup_and_place_it_in_the_basket_prompt_pick_up_the_alphabet_soup_and_place_it_i_failure.mp4",
          "src": "shuffle_test/shuffle_task00_trial05_episode15_pick_up_the_alphabet_soup_and_place_it_in_the_basket_prompt_pick_up_the_alphabet_soup_and_place_it_i_failure.mp4"
        },
        {
          "name": "shuffle_task00_trial06_episode38_pick_up_the_alphabet_soup_and_place_it_in_the_basket_prompt_pick_up_the_alphabet_soup_and_place_it_i_failure.mp4",
          "src": "shuffle_test/shuffle_task00_trial06_episode38_pick_up_the_alphabet_soup_and_place_it_in_the_basket_prompt_pick_up_the_alphabet_soup_and_place_it_i_failure.mp4"
        },
        {
          "name": "shuffle_task00_trial07_episode02_pick_up_the_alphabet_soup_and_place_it_in_the_basket_prompt_pick_up_the_alphabet_soup_and_place_it_i_failure.mp4",
          "src": "shuffle_test/shuffle_task00_trial07_episode02_pick_up_the_alphabet_soup_and_place_it_in_the_basket_prompt_pick_up_the_alphabet_soup_and_place_it_i_failure.mp4"
        },
        {
          "name": "shuffle_task00_trial08_episode10_pick_up_the_alphabet_soup_and_place_it_in_the_basket_prompt_pick_up_the_alphabet_soup_and_place_it_i_failure.mp4",
          "src": "shuffle_test/shuffle_task00_trial08_episode10_pick_up_the_alphabet_soup_and_place_it_in_the_basket_prompt_pick_up_the_alphabet_soup_and_place_it_i_failure.mp4"
        },
        {
          "name": "shuffle_task00_trial09_episode29_pick_up_the_alphabet_soup_and_place_it_in_the_basket_prompt_pick_up_the_alphabet_soup_and_place_it_i_failure.mp4",
          "src": "shuffle_test/shuffle_task00_trial09_episode29_pick_up_the_alphabet_soup_and_place_it_in_the_basket_prompt_pick_up_the_alphabet_soup_and_place_it_i_failure.mp4"
        },
        {
          "name": "shuffle_task01_trial00_episode26_pick_up_the_cream_cheese_and_place_it_in_the_basket_prompt_pick_up_the_cream_cheese_and_place_it_in_failure.mp4",
          "src": "shuffle_test/shuffle_task01_trial00_episode26_pick_up_the_cream_cheese_and_place_it_in_the_basket_prompt_pick_up_the_cream_cheese_and_place_it_in_failure.mp4"
        },
        {
          "name": "shuffle_task01_trial01_episode38_pick_up_the_cream_cheese_and_place_it_in_the_basket_prompt_pick_up_the_cream_cheese_and_place_it_in_failure.mp4",
          "src": "shuffle_test/shuffle_task01_trial01_episode38_pick_up_the_cream_cheese_and_place_it_in_the_basket_prompt_pick_up_the_cream_cheese_and_place_it_in_failure.mp4"
        },
        {
          "name": "shuffle_task01_trial02_episode15_pick_up_the_cream_cheese_and_place_it_in_the_basket_prompt_pick_up_the_cream_cheese_and_place_it_in_failure.mp4",
          "src": "shuffle_test/shuffle_task01_trial02_episode15_pick_up_the_cream_cheese_and_place_it_in_the_basket_prompt_pick_up_the_cream_cheese_and_place_it_in_failure.mp4"
        },
        {
          "name": "shuffle_task01_trial03_episode02_pick_up_the_cream_cheese_and_place_it_in_the_basket_prompt_pick_up_the_cream_cheese_and_place_it_in_success.mp4",
          "src": "shuffle_test/shuffle_task01_trial03_episode02_pick_up_the_cream_cheese_and_place_it_in_the_basket_prompt_pick_up_the_cream_cheese_and_place_it_in_success.mp4"
        },
        {
          "name": "shuffle_task01_trial04_episode06_pick_up_the_cream_cheese_and_place_it_in_the_basket_prompt_pick_up_the_cream_cheese_and_place_it_in_failure.mp4",
          "src": "shuffle_test/shuffle_task01_trial04_episode06_pick_up_the_cream_cheese_and_place_it_in_the_basket_prompt_pick_up_the_cream_cheese_and_place_it_in_failure.mp4"
        },
        {
          "name": "shuffle_task01_trial05_episode17_pick_up_the_cream_cheese_and_place_it_in_the_basket_prompt_pick_up_the_cream_cheese_and_place_it_in_success.mp4",
          "src": "shuffle_test/shuffle_task01_trial05_episode17_pick_up_the_cream_cheese_and_place_it_in_the_basket_prompt_pick_up_the_cream_cheese_and_place_it_in_success.mp4"
        },
        {
          "name": "shuffle_task01_trial06_episode34_pick_up_the_cream_cheese_and_place_it_in_the_basket_prompt_pick_up_the_cream_cheese_and_place_it_in_failure.mp4",
          "src": "shuffle_test/shuffle_task01_trial06_episode34_pick_up_the_cream_cheese_and_place_it_in_the_basket_prompt_pick_up_the_cream_cheese_and_place_it_in_failure.mp4"
        },
        {
          "name": "shuffle_task01_trial07_episode24_pick_up_the_cream_cheese_and_place_it_in_the_basket_prompt_pick_up_the_cream_cheese_and_place_it_in_success.mp4",
          "src": "shuffle_test/shuffle_task01_trial07_episode24_pick_up_the_cream_cheese_and_place_it_in_the_basket_prompt_pick_up_the_cream_cheese_and_place_it_in_success.mp4"
        },
        {
          "name": "shuffle_task01_trial08_episode14_pick_up_the_cream_cheese_and_place_it_in_the_basket_prompt_pick_up_the_cream_cheese_and_place_it_in_success.mp4",
          "src": "shuffle_test/shuffle_task01_trial08_episode14_pick_up_the_cream_cheese_and_place_it_in_the_basket_prompt_pick_up_the_cream_cheese_and_place_it_in_success.mp4"
        },
        {
          "name": "shuffle_task01_trial09_episode21_pick_up_the_cream_cheese_and_place_it_in_the_basket_prompt_pick_up_the_cream_cheese_and_place_it_in_success.mp4",
          "src": "shuffle_test/shuffle_task01_trial09_episode21_pick_up_the_cream_cheese_and_place_it_in_the_basket_prompt_pick_up_the_cream_cheese_and_place_it_in_success.mp4"
        },
        {
          "name": "shuffle_task02_trial00_episode39_pick_up_the_salad_dressing_and_place_it_in_the_basket_prompt_pick_up_the_salad_dressing_and_place_it__failure.mp4",
          "src": "shuffle_test/shuffle_task02_trial00_episode39_pick_up_the_salad_dressing_and_place_it_in_the_basket_prompt_pick_up_the_salad_dressing_and_place_it__failure.mp4"
        },
        {
          "name": "shuffle_task02_trial01_episode03_pick_up_the_salad_dressing_and_place_it_in_the_basket_prompt_pick_up_the_salad_dressing_and_place_it__success.mp4",
          "src": "shuffle_test/shuffle_task02_trial01_episode03_pick_up_the_salad_dressing_and_place_it_in_the_basket_prompt_pick_up_the_salad_dressing_and_place_it__success.mp4"
        },
        {
          "name": "shuffle_task02_trial02_episode09_pick_up_the_salad_dressing_and_place_it_in_the_basket_prompt_pick_up_the_salad_dressing_and_place_it__success.mp4",
          "src": "shuffle_test/shuffle_task02_trial02_episode09_pick_up_the_salad_dressing_and_place_it_in_the_basket_prompt_pick_up_the_salad_dressing_and_place_it__success.mp4"
        },
        {
          "name": "shuffle_task02_trial03_episode34_pick_up_the_salad_dressing_and_place_it_in_the_basket_prompt_pick_up_the_salad_dressing_and_place_it__success.mp4",
          "src": "shuffle_test/shuffle_task02_trial03_episode34_pick_up_the_salad_dressing_and_place_it_in_the_basket_prompt_pick_up_the_salad_dressing_and_place_it__success.mp4"
        },
        {
          "name": "shuffle_task02_trial04_episode15_pick_up_the_salad_dressing_and_place_it_in_the_basket_prompt_pick_up_the_salad_dressing_and_place_it__failure.mp4",
          "src": "shuffle_test/shuffle_task02_trial04_episode15_pick_up_the_salad_dressing_and_place_it_in_the_basket_prompt_pick_up_the_salad_dressing_and_place_it__failure.mp4"
        },
        {
          "name": "shuffle_task02_trial05_episode06_pick_up_the_salad_dressing_and_place_it_in_the_basket_prompt_pick_up_the_salad_dressing_and_place_it__failure.mp4",
          "src": "shuffle_test/shuffle_task02_trial05_episode06_pick_up_the_salad_dressing_and_place_it_in_the_basket_prompt_pick_up_the_salad_dressing_and_place_it__failure.mp4"
        },
        {
          "name": "shuffle_task02_trial06_episode45_pick_up_the_salad_dressing_and_place_it_in_the_basket_prompt_pick_up_the_salad_dressing_and_place_it__failure.mp4",
          "src": "shuffle_test/shuffle_task02_trial06_episode45_pick_up_the_salad_dressing_and_place_it_in_the_basket_prompt_pick_up_the_salad_dressing_and_place_it__failure.mp4"
        },
        {
          "name": "shuffle_task02_trial07_episode29_pick_up_the_salad_dressing_and_place_it_in_the_basket_prompt_pick_up_the_salad_dressing_and_place_it__failure.mp4",
          "src": "shuffle_test/shuffle_task02_trial07_episode29_pick_up_the_salad_dressing_and_place_it_in_the_basket_prompt_pick_up_the_salad_dressing_and_place_it__failure.mp4"
        },
        {
          "name": "shuffle_task02_trial08_episode44_pick_up_the_salad_dressing_and_place_it_in_the_basket_prompt_pick_up_the_salad_dressing_and_place_it__success.mp4",
          "src": "shuffle_test/shuffle_task02_trial08_episode44_pick_up_the_salad_dressing_and_place_it_in_the_basket_prompt_pick_up_the_salad_dressing_and_place_it__success.mp4"
        },
        {
          "name": "shuffle_task02_trial09_episode19_pick_up_the_salad_dressing_and_place_it_in_the_basket_prompt_pick_up_the_salad_dressing_and_place_it__failure.mp4",
          "src": "shuffle_test/shuffle_task02_trial09_episode19_pick_up_the_salad_dressing_and_place_it_in_the_basket_prompt_pick_up_the_salad_dressing_and_place_it__failure.mp4"
        },
        {
          "name": "shuffle_task03_trial00_episode22_pick_up_the_bbq_sauce_and_place_it_in_the_basket_prompt_pick_up_the_bbq_sauce_and_place_it_in_th_failure.mp4",
          "src": "shuffle_test/shuffle_task03_trial00_episode22_pick_up_the_bbq_sauce_and_place_it_in_the_basket_prompt_pick_up_the_bbq_sauce_and_place_it_in_th_failure.mp4"
        },
        {
          "name": "shuffle_task03_trial01_episode37_pick_up_the_bbq_sauce_and_place_it_in_the_basket_prompt_pick_up_the_bbq_sauce_and_place_it_in_th_failure.mp4",
          "src": "shuffle_test/shuffle_task03_trial01_episode37_pick_up_the_bbq_sauce_and_place_it_in_the_basket_prompt_pick_up_the_bbq_sauce_and_place_it_in_th_failure.mp4"
        },
        {
          "name": "shuffle_task03_trial02_episode20_pick_up_the_bbq_sauce_and_place_it_in_the_basket_prompt_pick_up_the_bbq_sauce_and_place_it_in_th_failure.mp4",
          "src": "shuffle_test/shuffle_task03_trial02_episode20_pick_up_the_bbq_sauce_and_place_it_in_the_basket_prompt_pick_up_the_bbq_sauce_and_place_it_in_th_failure.mp4"
        },
        {
          "name": "shuffle_task03_trial03_episode42_pick_up_the_bbq_sauce_and_place_it_in_the_basket_prompt_pick_up_the_bbq_sauce_and_place_it_in_th_failure.mp4",
          "src": "shuffle_test/shuffle_task03_trial03_episode42_pick_up_the_bbq_sauce_and_place_it_in_the_basket_prompt_pick_up_the_bbq_sauce_and_place_it_in_th_failure.mp4"
        },
        {
          "name": "shuffle_task03_trial04_episode02_pick_up_the_bbq_sauce_and_place_it_in_the_basket_prompt_pick_up_the_bbq_sauce_and_place_it_in_th_failure.mp4",
          "src": "shuffle_test/shuffle_task03_trial04_episode02_pick_up_the_bbq_sauce_and_place_it_in_the_basket_prompt_pick_up_the_bbq_sauce_and_place_it_in_th_failure.mp4"
        },
        {
          "name": "shuffle_task03_trial05_episode26_pick_up_the_bbq_sauce_and_place_it_in_the_basket_prompt_pick_up_the_bbq_sauce_and_place_it_in_th_failure.mp4",
          "src": "shuffle_test/shuffle_task03_trial05_episode26_pick_up_the_bbq_sauce_and_place_it_in_the_basket_prompt_pick_up_the_bbq_sauce_and_place_it_in_th_failure.mp4"
        },
        {
          "name": "shuffle_task03_trial06_episode01_pick_up_the_bbq_sauce_and_place_it_in_the_basket_prompt_pick_up_the_bbq_sauce_and_place_it_in_th_failure.mp4",
          "src": "shuffle_test/shuffle_task03_trial06_episode01_pick_up_the_bbq_sauce_and_place_it_in_the_basket_prompt_pick_up_the_bbq_sauce_and_place_it_in_th_failure.mp4"
        },
        {
          "name": "shuffle_task03_trial07_episode46_pick_up_the_bbq_sauce_and_place_it_in_the_basket_prompt_pick_up_the_bbq_sauce_and_place_it_in_th_failure.mp4",
          "src": "shuffle_test/shuffle_task03_trial07_episode46_pick_up_the_bbq_sauce_and_place_it_in_the_basket_prompt_pick_up_the_bbq_sauce_and_place_it_in_th_failure.mp4"
        },
        {
          "name": "shuffle_task03_trial08_episode19_pick_up_the_bbq_sauce_and_place_it_in_the_basket_prompt_pick_up_the_bbq_sauce_and_place_it_in_th_failure.mp4",
          "src": "shuffle_test/shuffle_task03_trial08_episode19_pick_up_the_bbq_sauce_and_place_it_in_the_basket_prompt_pick_up_the_bbq_sauce_and_place_it_in_th_failure.mp4"
        },
        {
          "name": "shuffle_task03_trial09_episode12_pick_up_the_bbq_sauce_and_place_it_in_the_basket_prompt_pick_up_the_bbq_sauce_and_place_it_in_th_success.mp4",
          "src": "shuffle_test/shuffle_task03_trial09_episode12_pick_up_the_bbq_sauce_and_place_it_in_the_basket_prompt_pick_up_the_bbq_sauce_and_place_it_in_th_success.mp4"
        },
        {
          "name": "shuffle_task04_trial00_episode04_pick_up_the_ketchup_and_place_it_in_the_basket_prompt_pick_up_the_ketchup_and_place_it_in_the__failure.mp4",
          "src": "shuffle_test/shuffle_task04_trial00_episode04_pick_up_the_ketchup_and_place_it_in_the_basket_prompt_pick_up_the_ketchup_and_place_it_in_the__failure.mp4"
        },
        {
          "name": "shuffle_task04_trial01_episode24_pick_up_the_ketchup_and_place_it_in_the_basket_prompt_pick_up_the_ketchup_and_place_it_in_the__failure.mp4",
          "src": "shuffle_test/shuffle_task04_trial01_episode24_pick_up_the_ketchup_and_place_it_in_the_basket_prompt_pick_up_the_ketchup_and_place_it_in_the__failure.mp4"
        },
        {
          "name": "shuffle_task04_trial02_episode34_pick_up_the_ketchup_and_place_it_in_the_basket_prompt_pick_up_the_ketchup_and_place_it_in_the__failure.mp4",
          "src": "shuffle_test/shuffle_task04_trial02_episode34_pick_up_the_ketchup_and_place_it_in_the_basket_prompt_pick_up_the_ketchup_and_place_it_in_the__failure.mp4"
        },
        {
          "name": "shuffle_task04_trial03_episode41_pick_up_the_ketchup_and_place_it_in_the_basket_prompt_pick_up_the_ketchup_and_place_it_in_the__failure.mp4",
          "src": "shuffle_test/shuffle_task04_trial03_episode41_pick_up_the_ketchup_and_place_it_in_the_basket_prompt_pick_up_the_ketchup_and_place_it_in_the__failure.mp4"
        },
        {
          "name": "shuffle_task04_trial04_episode21_pick_up_the_ketchup_and_place_it_in_the_basket_prompt_pick_up_the_ketchup_and_place_it_in_the__failure.mp4",
          "src": "shuffle_test/shuffle_task04_trial04_episode21_pick_up_the_ketchup_and_place_it_in_the_basket_prompt_pick_up_the_ketchup_and_place_it_in_the__failure.mp4"
        },
        {
          "name": "shuffle_task04_trial05_episode30_pick_up_the_ketchup_and_place_it_in_the_basket_prompt_pick_up_the_ketchup_and_place_it_in_the__failure.mp4",
          "src": "shuffle_test/shuffle_task04_trial05_episode30_pick_up_the_ketchup_and_place_it_in_the_basket_prompt_pick_up_the_ketchup_and_place_it_in_the__failure.mp4"
        },
        {
          "name": "shuffle_task04_trial06_episode43_pick_up_the_ketchup_and_place_it_in_the_basket_prompt_pick_up_the_ketchup_and_place_it_in_the__failure.mp4",
          "src": "shuffle_test/shuffle_task04_trial06_episode43_pick_up_the_ketchup_and_place_it_in_the_basket_prompt_pick_up_the_ketchup_and_place_it_in_the__failure.mp4"
        },
        {
          "name": "shuffle_task04_trial07_episode23_pick_up_the_ketchup_and_place_it_in_the_basket_prompt_pick_up_the_ketchup_and_place_it_in_the__failure.mp4",
          "src": "shuffle_test/shuffle_task04_trial07_episode23_pick_up_the_ketchup_and_place_it_in_the_basket_prompt_pick_up_the_ketchup_and_place_it_in_the__failure.mp4"
        },
        {
          "name": "shuffle_task04_trial08_episode31_pick_up_the_ketchup_and_place_it_in_the_basket_prompt_pick_up_the_ketchup_and_place_it_in_the__failure.mp4",
          "src": "shuffle_test/shuffle_task04_trial08_episode31_pick_up_the_ketchup_and_place_it_in_the_basket_prompt_pick_up_the_ketchup_and_place_it_in_the__failure.mp4"
        },
        {
          "name": "shuffle_task04_trial09_episode33_pick_up_the_ketchup_and_place_it_in_the_basket_prompt_pick_up_the_ketchup_and_place_it_in_the__failure.mp4",
          "src": "shuffle_test/shuffle_task04_trial09_episode33_pick_up_the_ketchup_and_place_it_in_the_basket_prompt_pick_up_the_ketchup_and_place_it_in_the__failure.mp4"
        },
        {
          "name": "shuffle_task05_trial00_episode26_pick_up_the_tomato_sauce_and_place_it_in_the_basket_prompt_pick_up_the_tomato_sauce_and_place_it_in_failure.mp4",
          "src": "shuffle_test/shuffle_task05_trial00_episode26_pick_up_the_tomato_sauce_and_place_it_in_the_basket_prompt_pick_up_the_tomato_sauce_and_place_it_in_failure.mp4"
        },
        {
          "name": "shuffle_task05_trial01_episode04_pick_up_the_tomato_sauce_and_place_it_in_the_basket_prompt_pick_up_the_tomato_sauce_and_place_it_in_success.mp4",
          "src": "shuffle_test/shuffle_task05_trial01_episode04_pick_up_the_tomato_sauce_and_place_it_in_the_basket_prompt_pick_up_the_tomato_sauce_and_place_it_in_success.mp4"
        },
        {
          "name": "shuffle_task05_trial02_episode33_pick_up_the_tomato_sauce_and_place_it_in_the_basket_prompt_pick_up_the_tomato_sauce_and_place_it_in_failure.mp4",
          "src": "shuffle_test/shuffle_task05_trial02_episode33_pick_up_the_tomato_sauce_and_place_it_in_the_basket_prompt_pick_up_the_tomato_sauce_and_place_it_in_failure.mp4"
        },
        {
          "name": "shuffle_task05_trial03_episode36_pick_up_the_tomato_sauce_and_place_it_in_the_basket_prompt_pick_up_the_tomato_sauce_and_place_it_in_failure.mp4",
          "src": "shuffle_test/shuffle_task05_trial03_episode36_pick_up_the_tomato_sauce_and_place_it_in_the_basket_prompt_pick_up_the_tomato_sauce_and_place_it_in_failure.mp4"
        },
        {
          "name": "shuffle_task05_trial04_episode24_pick_up_the_tomato_sauce_and_place_it_in_the_basket_prompt_pick_up_the_tomato_sauce_and_place_it_in_failure.mp4",
          "src": "shuffle_test/shuffle_task05_trial04_episode24_pick_up_the_tomato_sauce_and_place_it_in_the_basket_prompt_pick_up_the_tomato_sauce_and_place_it_in_failure.mp4"
        },
        {
          "name": "shuffle_task05_trial05_episode13_pick_up_the_tomato_sauce_and_place_it_in_the_basket_prompt_pick_up_the_tomato_sauce_and_place_it_in_failure.mp4",
          "src": "shuffle_test/shuffle_task05_trial05_episode13_pick_up_the_tomato_sauce_and_place_it_in_the_basket_prompt_pick_up_the_tomato_sauce_and_place_it_in_failure.mp4"
        },
        {
          "name": "shuffle_task05_trial06_episode05_pick_up_the_tomato_sauce_and_place_it_in_the_basket_prompt_pick_up_the_tomato_sauce_and_place_it_in_failure.mp4",
          "src": "shuffle_test/shuffle_task05_trial06_episode05_pick_up_the_tomato_sauce_and_place_it_in_the_basket_prompt_pick_up_the_tomato_sauce_and_place_it_in_failure.mp4"
        },
        {
          "name": "shuffle_task05_trial07_episode44_pick_up_the_tomato_sauce_and_place_it_in_the_basket_prompt_pick_up_the_tomato_sauce_and_place_it_in_failure.mp4",
          "src": "shuffle_test/shuffle_task05_trial07_episode44_pick_up_the_tomato_sauce_and_place_it_in_the_basket_prompt_pick_up_the_tomato_sauce_and_place_it_in_failure.mp4"
        },
        {
          "name": "shuffle_task05_trial08_episode40_pick_up_the_tomato_sauce_and_place_it_in_the_basket_prompt_pick_up_the_tomato_sauce_and_place_it_in_failure.mp4",
          "src": "shuffle_test/shuffle_task05_trial08_episode40_pick_up_the_tomato_sauce_and_place_it_in_the_basket_prompt_pick_up_the_tomato_sauce_and_place_it_in_failure.mp4"
        },
        {
          "name": "shuffle_task05_trial09_episode20_pick_up_the_tomato_sauce_and_place_it_in_the_basket_prompt_pick_up_the_tomato_sauce_and_place_it_in_failure.mp4",
          "src": "shuffle_test/shuffle_task05_trial09_episode20_pick_up_the_tomato_sauce_and_place_it_in_the_basket_prompt_pick_up_the_tomato_sauce_and_place_it_in_failure.mp4"
        },
        {
          "name": "shuffle_task06_trial00_episode12_pick_up_the_butter_and_place_it_in_the_basket_prompt_pick_up_the_butter_and_place_it_in_the_b_failure.mp4",
          "src": "shuffle_test/shuffle_task06_trial00_episode12_pick_up_the_butter_and_place_it_in_the_basket_prompt_pick_up_the_butter_and_place_it_in_the_b_failure.mp4"
        },
        {
          "name": "shuffle_task06_trial01_episode28_pick_up_the_butter_and_place_it_in_the_basket_prompt_pick_up_the_butter_and_place_it_in_the_b_failure.mp4",
          "src": "shuffle_test/shuffle_task06_trial01_episode28_pick_up_the_butter_and_place_it_in_the_basket_prompt_pick_up_the_butter_and_place_it_in_the_b_failure.mp4"
        },
        {
          "name": "shuffle_task06_trial02_episode38_pick_up_the_butter_and_place_it_in_the_basket_prompt_pick_up_the_butter_and_place_it_in_the_b_success.mp4",
          "src": "shuffle_test/shuffle_task06_trial02_episode38_pick_up_the_butter_and_place_it_in_the_basket_prompt_pick_up_the_butter_and_place_it_in_the_b_success.mp4"
        },
        {
          "name": "shuffle_task06_trial03_episode11_pick_up_the_butter_and_place_it_in_the_basket_prompt_pick_up_the_butter_and_place_it_in_the_b_failure.mp4",
          "src": "shuffle_test/shuffle_task06_trial03_episode11_pick_up_the_butter_and_place_it_in_the_basket_prompt_pick_up_the_butter_and_place_it_in_the_b_failure.mp4"
        },
        {
          "name": "shuffle_task06_trial04_episode48_pick_up_the_butter_and_place_it_in_the_basket_prompt_pick_up_the_butter_and_place_it_in_the_b_success.mp4",
          "src": "shuffle_test/shuffle_task06_trial04_episode48_pick_up_the_butter_and_place_it_in_the_basket_prompt_pick_up_the_butter_and_place_it_in_the_b_success.mp4"
        },
        {
          "name": "shuffle_task06_trial05_episode44_pick_up_the_butter_and_place_it_in_the_basket_prompt_pick_up_the_butter_and_place_it_in_the_b_failure.mp4",
          "src": "shuffle_test/shuffle_task06_trial05_episode44_pick_up_the_butter_and_place_it_in_the_basket_prompt_pick_up_the_butter_and_place_it_in_the_b_failure.mp4"
        },
        {
          "name": "shuffle_task06_trial06_episode47_pick_up_the_butter_and_place_it_in_the_basket_prompt_pick_up_the_butter_and_place_it_in_the_b_failure.mp4",
          "src": "shuffle_test/shuffle_task06_trial06_episode47_pick_up_the_butter_and_place_it_in_the_basket_prompt_pick_up_the_butter_and_place_it_in_the_b_failure.mp4"
        },
        {
          "name": "shuffle_task06_trial07_episode24_pick_up_the_butter_and_place_it_in_the_basket_prompt_pick_up_the_butter_and_place_it_in_the_b_failure.mp4",
          "src": "shuffle_test/shuffle_task06_trial07_episode24_pick_up_the_butter_and_place_it_in_the_basket_prompt_pick_up_the_butter_and_place_it_in_the_b_failure.mp4"
        },
        {
          "name": "shuffle_task06_trial08_episode39_pick_up_the_butter_and_place_it_in_the_basket_prompt_pick_up_the_butter_and_place_it_in_the_b_failure.mp4",
          "src": "shuffle_test/shuffle_task06_trial08_episode39_pick_up_the_butter_and_place_it_in_the_basket_prompt_pick_up_the_butter_and_place_it_in_the_b_failure.mp4"
        },
        {
          "name": "shuffle_task06_trial09_episode35_pick_up_the_butter_and_place_it_in_the_basket_prompt_pick_up_the_butter_and_place_it_in_the_b_failure.mp4",
          "src": "shuffle_test/shuffle_task06_trial09_episode35_pick_up_the_butter_and_place_it_in_the_basket_prompt_pick_up_the_butter_and_place_it_in_the_b_failure.mp4"
        },
        {
          "name": "shuffle_task07_trial00_episode30_pick_up_the_milk_and_place_it_in_the_basket_prompt_pick_up_the_milk_and_place_it_in_the_bas_failure.mp4",
          "src": "shuffle_test/shuffle_task07_trial00_episode30_pick_up_the_milk_and_place_it_in_the_basket_prompt_pick_up_the_milk_and_place_it_in_the_bas_failure.mp4"
        },
        {
          "name": "shuffle_task07_trial01_episode39_pick_up_the_milk_and_place_it_in_the_basket_prompt_pick_up_the_milk_and_place_it_in_the_bas_success.mp4",
          "src": "shuffle_test/shuffle_task07_trial01_episode39_pick_up_the_milk_and_place_it_in_the_basket_prompt_pick_up_the_milk_and_place_it_in_the_bas_success.mp4"
        },
        {
          "name": "shuffle_task07_trial02_episode19_pick_up_the_milk_and_place_it_in_the_basket_prompt_pick_up_the_milk_and_place_it_in_the_bas_failure.mp4",
          "src": "shuffle_test/shuffle_task07_trial02_episode19_pick_up_the_milk_and_place_it_in_the_basket_prompt_pick_up_the_milk_and_place_it_in_the_bas_failure.mp4"
        },
        {
          "name": "shuffle_task07_trial03_episode07_pick_up_the_milk_and_place_it_in_the_basket_prompt_pick_up_the_milk_and_place_it_in_the_bas_failure.mp4",
          "src": "shuffle_test/shuffle_task07_trial03_episode07_pick_up_the_milk_and_place_it_in_the_basket_prompt_pick_up_the_milk_and_place_it_in_the_bas_failure.mp4"
        },
        {
          "name": "shuffle_task07_trial04_episode40_pick_up_the_milk_and_place_it_in_the_basket_prompt_pick_up_the_milk_and_place_it_in_the_bas_success.mp4",
          "src": "shuffle_test/shuffle_task07_trial04_episode40_pick_up_the_milk_and_place_it_in_the_basket_prompt_pick_up_the_milk_and_place_it_in_the_bas_success.mp4"
        },
        {
          "name": "shuffle_task07_trial05_episode22_pick_up_the_milk_and_place_it_in_the_basket_prompt_pick_up_the_milk_and_place_it_in_the_bas_success.mp4",
          "src": "shuffle_test/shuffle_task07_trial05_episode22_pick_up_the_milk_and_place_it_in_the_basket_prompt_pick_up_the_milk_and_place_it_in_the_bas_success.mp4"
        },
        {
          "name": "shuffle_task07_trial06_episode42_pick_up_the_milk_and_place_it_in_the_basket_prompt_pick_up_the_milk_and_place_it_in_the_bas_failure.mp4",
          "src": "shuffle_test/shuffle_task07_trial06_episode42_pick_up_the_milk_and_place_it_in_the_basket_prompt_pick_up_the_milk_and_place_it_in_the_bas_failure.mp4"
        },
        {
          "name": "shuffle_task07_trial07_episode31_pick_up_the_milk_and_place_it_in_the_basket_prompt_pick_up_the_milk_and_place_it_in_the_bas_failure.mp4",
          "src": "shuffle_test/shuffle_task07_trial07_episode31_pick_up_the_milk_and_place_it_in_the_basket_prompt_pick_up_the_milk_and_place_it_in_the_bas_failure.mp4"
        },
        {
          "name": "shuffle_task07_trial08_episode32_pick_up_the_milk_and_place_it_in_the_basket_prompt_pick_up_the_milk_and_place_it_in_the_bas_success.mp4",
          "src": "shuffle_test/shuffle_task07_trial08_episode32_pick_up_the_milk_and_place_it_in_the_basket_prompt_pick_up_the_milk_and_place_it_in_the_bas_success.mp4"
        },
        {
          "name": "shuffle_task07_trial09_episode02_pick_up_the_milk_and_place_it_in_the_basket_prompt_pick_up_the_milk_and_place_it_in_the_bas_failure.mp4",
          "src": "shuffle_test/shuffle_task07_trial09_episode02_pick_up_the_milk_and_place_it_in_the_basket_prompt_pick_up_the_milk_and_place_it_in_the_bas_failure.mp4"
        },
        {
          "name": "shuffle_task08_trial00_episode21_pick_up_the_chocolate_pudding_and_place_it_in_the_basket_prompt_pick_up_the_chocolate_pudding_and_place__failure.mp4",
          "src": "shuffle_test/shuffle_task08_trial00_episode21_pick_up_the_chocolate_pudding_and_place_it_in_the_basket_prompt_pick_up_the_chocolate_pudding_and_place__failure.mp4"
        },
        {
          "name": "shuffle_task08_trial01_episode03_pick_up_the_chocolate_pudding_and_place_it_in_the_basket_prompt_pick_up_the_chocolate_pudding_and_place__failure.mp4",
          "src": "shuffle_test/shuffle_task08_trial01_episode03_pick_up_the_chocolate_pudding_and_place_it_in_the_basket_prompt_pick_up_the_chocolate_pudding_and_place__failure.mp4"
        },
        {
          "name": "shuffle_task08_trial02_episode30_pick_up_the_chocolate_pudding_and_place_it_in_the_basket_prompt_pick_up_the_chocolate_pudding_and_place__failure.mp4",
          "src": "shuffle_test/shuffle_task08_trial02_episode30_pick_up_the_chocolate_pudding_and_place_it_in_the_basket_prompt_pick_up_the_chocolate_pudding_and_place__failure.mp4"
        },
        {
          "name": "shuffle_task08_trial03_episode23_pick_up_the_chocolate_pudding_and_place_it_in_the_basket_prompt_pick_up_the_chocolate_pudding_and_place__success.mp4",
          "src": "shuffle_test/shuffle_task08_trial03_episode23_pick_up_the_chocolate_pudding_and_place_it_in_the_basket_prompt_pick_up_the_chocolate_pudding_and_place__success.mp4"
        },
        {
          "name": "shuffle_task08_trial04_episode44_pick_up_the_chocolate_pudding_and_place_it_in_the_basket_prompt_pick_up_the_chocolate_pudding_and_place__failure.mp4",
          "src": "shuffle_test/shuffle_task08_trial04_episode44_pick_up_the_chocolate_pudding_and_place_it_in_the_basket_prompt_pick_up_the_chocolate_pudding_and_place__failure.mp4"
        },
        {
          "name": "shuffle_task08_trial05_episode39_pick_up_the_chocolate_pudding_and_place_it_in_the_basket_prompt_pick_up_the_chocolate_pudding_and_place__failure.mp4",
          "src": "shuffle_test/shuffle_task08_trial05_episode39_pick_up_the_chocolate_pudding_and_place_it_in_the_basket_prompt_pick_up_the_chocolate_pudding_and_place__failure.mp4"
        },
        {
          "name": "shuffle_task08_trial06_episode20_pick_up_the_chocolate_pudding_and_place_it_in_the_basket_prompt_pick_up_the_chocolate_pudding_and_place__failure.mp4",
          "src": "shuffle_test/shuffle_task08_trial06_episode20_pick_up_the_chocolate_pudding_and_place_it_in_the_basket_prompt_pick_up_the_chocolate_pudding_and_place__failure.mp4"
        },
        {
          "name": "shuffle_task08_trial07_episode33_pick_up_the_chocolate_pudding_and_place_it_in_the_basket_prompt_pick_up_the_chocolate_pudding_and_place__failure.mp4",
          "src": "shuffle_test/shuffle_task08_trial07_episode33_pick_up_the_chocolate_pudding_and_place_it_in_the_basket_prompt_pick_up_the_chocolate_pudding_and_place__failure.mp4"
        },
        {
          "name": "shuffle_task08_trial08_episode10_pick_up_the_chocolate_pudding_and_place_it_in_the_basket_prompt_pick_up_the_chocolate_pudding_and_place__failure.mp4",
          "src": "shuffle_test/shuffle_task08_trial08_episode10_pick_up_the_chocolate_pudding_and_place_it_in_the_basket_prompt_pick_up_the_chocolate_pudding_and_place__failure.mp4"
        },
        {
          "name": "shuffle_task08_trial09_episode32_pick_up_the_chocolate_pudding_and_place_it_in_the_basket_prompt_pick_up_the_chocolate_pudding_and_place__failure.mp4",
          "src": "shuffle_test/shuffle_task08_trial09_episode32_pick_up_the_chocolate_pudding_and_place_it_in_the_basket_prompt_pick_up_the_chocolate_pudding_and_place__failure.mp4"
        },
        {
          "name": "shuffle_task09_trial00_episode17_pick_up_the_orange_juice_and_place_it_in_the_basket_prompt_pick_up_the_orange_juice_and_place_it_in_failure.mp4",
          "src": "shuffle_test/shuffle_task09_trial00_episode17_pick_up_the_orange_juice_and_place_it_in_the_basket_prompt_pick_up_the_orange_juice_and_place_it_in_failure.mp4"
        },
        {
          "name": "shuffle_task09_trial01_episode24_pick_up_the_orange_juice_and_place_it_in_the_basket_prompt_pick_up_the_orange_juice_and_place_it_in_failure.mp4",
          "src": "shuffle_test/shuffle_task09_trial01_episode24_pick_up_the_orange_juice_and_place_it_in_the_basket_prompt_pick_up_the_orange_juice_and_place_it_in_failure.mp4"
        },
        {
          "name": "shuffle_task09_trial02_episode32_pick_up_the_orange_juice_and_place_it_in_the_basket_prompt_pick_up_the_orange_juice_and_place_it_in_failure.mp4",
          "src": "shuffle_test/shuffle_task09_trial02_episode32_pick_up_the_orange_juice_and_place_it_in_the_basket_prompt_pick_up_the_orange_juice_and_place_it_in_failure.mp4"
        },
        {
          "name": "shuffle_task09_trial03_episode40_pick_up_the_orange_juice_and_place_it_in_the_basket_prompt_pick_up_the_orange_juice_and_place_it_in_success.mp4",
          "src": "shuffle_test/shuffle_task09_trial03_episode40_pick_up_the_orange_juice_and_place_it_in_the_basket_prompt_pick_up_the_orange_juice_and_place_it_in_success.mp4"
        },
        {
          "name": "shuffle_task09_trial04_episode48_pick_up_the_orange_juice_and_place_it_in_the_basket_prompt_pick_up_the_orange_juice_and_place_it_in_failure.mp4",
          "src": "shuffle_test/shuffle_task09_trial04_episode48_pick_up_the_orange_juice_and_place_it_in_the_basket_prompt_pick_up_the_orange_juice_and_place_it_in_failure.mp4"
        },
        {
          "name": "shuffle_task09_trial05_episode33_pick_up_the_orange_juice_and_place_it_in_the_basket_prompt_pick_up_the_orange_juice_and_place_it_in_failure.mp4",
          "src": "shuffle_test/shuffle_task09_trial05_episode33_pick_up_the_orange_juice_and_place_it_in_the_basket_prompt_pick_up_the_orange_juice_and_place_it_in_failure.mp4"
        },
        {
          "name": "shuffle_task09_trial06_episode47_pick_up_the_orange_juice_and_place_it_in_the_basket_prompt_pick_up_the_orange_juice_and_place_it_in_failure.mp4",
          "src": "shuffle_test/shuffle_task09_trial06_episode47_pick_up_the_orange_juice_and_place_it_in_the_basket_prompt_pick_up_the_orange_juice_and_place_it_in_failure.mp4"
        },
        {
          "name": "shuffle_task09_trial07_episode18_pick_up_the_orange_juice_and_place_it_in_the_basket_prompt_pick_up_the_orange_juice_and_place_it_in_failure.mp4",
          "src": "shuffle_test/shuffle_task09_trial07_episode18_pick_up_the_orange_juice_and_place_it_in_the_basket_prompt_pick_up_the_orange_juice_and_place_it_in_failure.mp4"
        },
        {
          "name": "shuffle_task09_trial08_episode46_pick_up_the_orange_juice_and_place_it_in_the_basket_prompt_pick_up_the_orange_juice_and_place_it_in_success.mp4",
          "src": "shuffle_test/shuffle_task09_trial08_episode46_pick_up_the_orange_juice_and_place_it_in_the_basket_prompt_pick_up_the_orange_juice_and_place_it_in_success.mp4"
        },
        {
          "name": "shuffle_task09_trial09_episode06_pick_up_the_orange_juice_and_place_it_in_the_basket_prompt_pick_up_the_orange_juice_and_place_it_in_failure.mp4",
          "src": "shuffle_test/shuffle_task09_trial09_episode06_pick_up_the_orange_juice_and_place_it_in_the_basket_prompt_pick_up_the_orange_juice_and_place_it_in_failure.mp4"
        }
      ]
    }
  ]
};

window.SITE_CONTENT.hero = {
  title: "On the Instruction-Following Limitations of Vision-Language-Action Models on LIBERO",
  subtitle: "LIBERO-finetuned VLAs often recover the task from the scene instead of from the prompt.",
  links: [
    { label: "Manuscript", href: "downloads/main.tex" },
    { label: "Artifact archive", href: "#artifacts" }
  ]
};

window.SITE_CONTENT.core_claim_stats = [
  {
    label: "OpenVLA-OFT Spatial",
    value: "98% -> 83% / 84%",
    note: "Success remains high under empty and contradictory prompts."
  },
  {
    label: "OpenVLA-OFT Object",
    value: "97% -> 96% / 97%",
    note: "Object behavior barely changes when language is removed."
  },
  {
    label: "pi0.5 muted prompt",
    value: "Spatial 61/100, Object 60/100",
    note: "Prompt removal still leaves substantial success in the scene-specific suites."
  }
];

window.SITE_CONTENT.sections = {
  core_claim: {
    intro:
      "Across Spatial and Object, benchmark success often survives prompt removal or contradiction because each task is paired with a characteristic scene configuration. The benchmark can therefore reward scene retrieval instead of genuine instruction following."
  },
  why_problem: {
    paragraphs: [
      "In Spatial and Object, task identity is partially leaked by the layout itself: where the bowl starts, which object sits in the target slot, and how the scene is arranged around the robot. A model can look competent on the benchmark while relying on these visual regularities instead of the prompt.",
      "Goal should not be the lead result. Goal is useful later because all ten tasks share the same scene, so language has to disambiguate the behavior. That makes Goal a control for when language matters, not the primary evidence for scene shortcutting."
    ]
  },
  openvla: {
    intro:
      "We evaluated the combined checkpoint moojink/openvla-7b-oft-finetuned-libero-spatial-object-goal-10 over 900 episodes: 3 suites x 3 prompt conditions x 10 tasks x 10 episodes.",
    note:
      "Spatial and Object are the primary evidence here. Goal is retained as a control showing what happens when language actually has to choose among multiple behaviors in the same scene."
  },
  pi05: {
    intro:
      "For pi0.5, we use the official OpenPI LIBERO baseline for the released checkpoint and custom probes for muted prompts, prompt edits, and scene-layout perturbations.",
    caveat:
      "The muted pi0.5 prompt is a single blank space rather than a strict empty string. Debug traces show that this still yields only two prompt tokens, while the two camera views contribute 512 visual tokens."
  },
  shortcuts: {
    intro:
      "The Object task specifications explicitly distinguish target_object_region from other_object_region placements. The cream-cheese task makes the shortcut visible: once the layout is perturbed, the arm tracks the target slot much more reliably than the object named in the instruction."
  },
  composition: {
    intro:
      "Goal is useful here because all ten tasks share one kitchen scene. When we edit the prompt into new combinations, the failures look like shallow recombination of memorized behaviors rather than robust semantic composition."
  },
  method: {
    cards: [
      {
        title: "OpenVLA-OFT protocol",
        body:
          "Custom server/client evaluation of the combined LIBERO checkpoint over Spatial, Object, and Goal with three prompt conditions: task, empty, and 'don't do anything'."
      },
      {
        title: "pi0.5 protocol",
        body:
          "Official OpenPI LIBERO baseline plus custom scripts for muted prompts, Object prompt edits, Goal prompt edits, and seeded object-position shuffles."
      },
      {
        title: "Why Goal appears later",
        body:
          "Goal is not the main finding because it is a same-scene suite. It serves as a control showing that language matters once the scene no longer identifies the task."
      },
      {
        title: "Why the shuffle matters",
        body:
          "The shuffle probe breaks the usual target-region regularity. The resulting 23/100 success rate provides mechanism-level evidence that the model relies heavily on layout priors."
      }
    ],
    notes: [
      "The inline clips are curated representatives chosen to make the argument legible quickly. They are not exhaustive samples of every rollout in the underlying folders.",
      "All rates shown on this page come directly from the saved CSVs or logs in the linked artifacts."
    ]
  },
  artifacts: {
    intro:
      "The main page uses a curated subset of videos. The remaining folders, rollout tables, prompt-ablation logs, and manuscript source are linked below in a collapsible artifact browser."
  }
};

window.SITE_CONTENT.table_rows.pi05 = [
  {
    setting: "Official baseline",
    suite: "Spatial",
    episodes: "500",
    success: "98.4%"
  },
  {
    setting: "Muted prompt (' ')",
    suite: "Spatial",
    episodes: "100",
    success: "61%"
  },
  {
    setting: "Muted prompt (' ')",
    suite: "Object",
    episodes: "100",
    success: "60%"
  },
  {
    setting: "Muted prompt (' ')",
    suite: "Goal",
    episodes: "50",
    success: "3/50"
  },
  {
    setting: "Seeded object shuffle",
    suite: "Object",
    episodes: "100",
    success: "23/100"
  }
];

window.SITE_CONTENT.openvla_modules = [
  {
    title: "Spatial comparison",
    caption:
      "Spatial is part of the main claim: the task prompt matters less than it should because the scene itself still strongly identifies the intended bowl movement.",
    videos: [
      {
        title: "Original prompt",
        caption:
          "Task 0: pick up the black bowl between the plate and the ramekin and place it on the plate.",
        model: "openvla",
        suite: "spatial",
        condition: "task",
        prompt_text: "pick up the black bowl between the plate and the ramekin and place it on the plate",
        result: "success",
        src: "openvla_spatial/task.mp4",
        notes: "Aggregate Spatial success is 98% with the original prompt."
      },
      {
        title: "Empty prompt",
        caption: "Same scene and initial state, but the prompt is removed.",
        model: "openvla",
        suite: "spatial",
        condition: "empty",
        prompt_text: "",
        result: "success",
        src: "openvla_spatial/empty.mp4",
        notes: "Aggregate Spatial success remains 83%."
      },
      {
        title: "Contradictory prompt",
        caption: "Same scene with the instruction 'don't do anything'.",
        model: "openvla",
        suite: "spatial",
        condition: "do_nothing",
        prompt_text: "don't do anything",
        result: "success",
        src: "openvla_spatial/do_nothing.mp4",
        notes: "Aggregate Spatial success remains 84%."
      }
    ]
  },
  {
    title: "Object comparison",
    caption:
      "Object is the clearest evidence that the model remembers the scene: even after removing or contradicting the prompt, the arm still goes after the originally designated target object.",
    videos: [
      {
        title: "Original prompt",
        caption: "Task 1: pick up the cream cheese and place it in the basket.",
        model: "openvla",
        suite: "object",
        condition: "task",
        prompt_text: "pick up the cream cheese and place it in the basket",
        result: "success",
        src: "openvla_object/task.mp4",
        notes: "Aggregate Object success is 97% with the original prompt."
      },
      {
        title: "Empty prompt",
        caption: "Same task and same initial state with the prompt removed.",
        model: "openvla",
        suite: "object",
        condition: "empty",
        prompt_text: "",
        result: "success",
        src: "openvla_object/empty.mp4",
        notes: "Aggregate Object success remains 96%."
      },
      {
        title: "Contradictory prompt",
        caption: "Same task and state with the instruction 'don't do anything'.",
        model: "openvla",
        suite: "object",
        condition: "do_nothing",
        prompt_text: "don't do anything",
        result: "success",
        src: "openvla_object/do_nothing.mp4",
        notes: "Aggregate Object success remains 97%."
      }
    ]
  },
  {
    title: "Goal as a control",
    caption:
      "Goal is shown later because it is a same-scene control. Once the scene no longer identifies the task, removing or contradicting the prompt collapses performance.",
    videos: [
      {
        title: "Original prompt",
        caption: "Task 0: open the middle drawer of the cabinet.",
        model: "openvla",
        suite: "goal",
        condition: "task",
        prompt_text: "open the middle drawer of the cabinet",
        result: "success",
        src: "openvla_goal/task.mp4",
        notes: "Aggregate Goal success is 97% with the original prompt."
      },
      {
        title: "Empty prompt",
        caption: "Same scene and initial state, but the prompt is removed.",
        model: "openvla",
        suite: "goal",
        condition: "empty",
        prompt_text: "",
        result: "failure",
        src: "openvla_goal/empty.mp4",
        notes: "Aggregate Goal success falls to 10%."
      },
      {
        title: "Contradictory prompt",
        caption: "Same scene with the instruction 'don't do anything'.",
        model: "openvla",
        suite: "goal",
        condition: "do_nothing",
        prompt_text: "don't do anything",
        result: "failure",
        src: "openvla_goal/do_nothing.mp4",
        notes: "Contradictory language performs no better than no language."
      }
    ]
  }
];

window.SITE_CONTENT.pi05_modules = [
  {
    title: "Object prompt probes on the cream-cheese task",
    caption:
      "The same Object scene is probed with blank, contradictory, and wrong-object prompts. The behavior does not reliably re-ground to the new language.",
    videos: [
      {
        title: "Baseline Object prompt",
        caption: "Original cream-cheese task under the baseline prompt.",
        model: "pi05",
        suite: "object",
        condition: "baseline",
        prompt_text: "pick up the cream cheese and place it in the basket",
        result: "success",
        src: "object_baseline/rollout_pick_up_the_cream_cheese_and_place_it_in_the_basket_success.mp4",
        notes: "Representative baseline object rollout."
      },
      {
        title: "Blank prompt",
        caption: "The client sends a blank-space prompt on the same task.",
        model: "pi05",
        suite: "object",
        condition: "blank",
        prompt_text: " ",
        result: "success",
        src: "object_different_prompt/object_task01_episode00_pick_up_the_cream_cheese_and_place_it_in_the_basket_prompt_blank_success.mp4",
        notes: "Muted-prompt Object success is 60/100."
      },
      {
        title: "Don't do anything",
        caption: "Contradictory prompt on the same cream-cheese task.",
        model: "pi05",
        suite: "object",
        condition: "contradictory",
        prompt_text: "Don't do anything",
        result: "success",
        src: "object_different_prompt/object_task01_episode00_pick_up_the_cream_cheese_and_place_it_in_the_basket_prompt_Don_t_do_anything_success.mp4",
        notes: "The arm still executes the original manipulation pattern."
      },
      {
        title: "Wrong-object prompt",
        caption: "Prompt edited to 'pick up the milk and place it in the basket'.",
        model: "pi05",
        suite: "object",
        condition: "wrong object",
        prompt_text: "pick up the milk and place it in the basket",
        result: "failure",
        src: "object_different_prompt/object_task01_episode00_pick_up_the_cream_cheese_and_place_it_in_the_basket_prompt_pick_up_the_milk_and_place_it_in_the_basket_failure.mp4",
        notes: "The prompt changes, but the behavior does not reliably follow the newly named object."
      }
    ]
  },
  {
    title: "Goal prompt probes on the shared kitchen scene",
    caption:
      "Goal is secondary evidence here. Because all ten tasks share one scene, prompt removal and prompt edits sharply expose the dependence on language once the scene stops identifying the task.",
    videos: [
      {
        title: "Baseline Goal prompt",
        caption: "Original Goal instruction succeeds on the shared scene.",
        model: "pi05",
        suite: "goal",
        condition: "baseline",
        prompt_text: "open the middle drawer of the cabinet",
        result: "success",
        src: "goal_baseline/rollout_open_the_middle_drawer_of_the_cabinet_success.mp4",
        notes: "Representative baseline Goal rollout."
      },
      {
        title: "Muted prompt",
        caption: "The prompt is reduced to a blank-space token sequence.",
        model: "pi05",
        suite: "goal",
        condition: "blank",
        prompt_text: " ",
        result: "failure",
        src: "goal_empty_prompt/task00_episode00_open_the_middle_drawer_of_the_cabinet_failure.mp4",
        notes: "Muted-prompt Goal success is 3/50."
      },
      {
        title: "Edited prompt",
        caption: "Prompt edited to 'open the middle drawer and put the bowl inside'.",
        model: "pi05",
        suite: "goal",
        condition: "edited prompt",
        prompt_text: "open the middle drawer and put the bowl inside",
        result: "failure",
        src: "goal_different_prompt/goal_task00_episode00_open_the_middle_drawer_of_the_cabinet_prompt_open_the_middle_drawer_and_put_the_bowl_inside_failure.mp4",
        notes: "The response looks like reuse of a memorized top-drawer behavior rather than robust composition."
      }
    ]
  }
];

window.SITE_CONTENT.shortcut_modules = [
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
        notes: "The cream cheese begins in the task's designated target region."
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
        notes: "The original prompt no longer guarantees the correct object once the layout prior is disturbed."
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
        notes: "Across 100 shuffled Object episodes, success falls to 23/100."
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
        notes: "The remaining successes are brittle and heavily layout-dependent."
      }
    ]
  }
];

window.SITE_CONTENT.composition_modules = [
  {
    title: "Same-scene edited prompts on pi0.5 Goal task 0",
    caption:
      "All three clips use the same underlying Goal scene. Only the prompt changes, which makes the resulting failures useful as evidence of shallow recombination rather than grounded language composition.",
    videos: [
      {
        title: "Drawer + bowl-inside edit",
        caption: "Prompt: 'open the middle drawer and put the bowl inside'.",
        model: "pi05",
        suite: "goal",
        condition: "edited prompt",
        prompt_text: "open the middle drawer and put the bowl inside",
        result: "failure",
        src: "goal_different_prompt/goal_task00_episode00_open_the_middle_drawer_of_the_cabinet_prompt_open_the_middle_drawer_and_put_the_bowl_inside_failure.mp4",
        notes: "The model falls back to a memorized top-drawer action pattern."
      },
      {
        title: "Wine bottle on stove",
        caption: "Prompt: 'put the wine bottle on the stove'.",
        model: "pi05",
        suite: "goal",
        condition: "edited prompt",
        prompt_text: "put the wine bottle on the stove",
        result: "failure",
        src: "goal_different_prompt/goal_task00_episode00_open_the_middle_drawer_of_the_cabinet_prompt_put_the_wine_bottle_on_the_stove_failure.mp4",
        notes: "The requested object-goal combination is not composed robustly."
      },
      {
        title: "Cream cheese stove",
        caption: "Prompt compressed into a short compositional fragment.",
        model: "pi05",
        suite: "goal",
        condition: "edited prompt",
        prompt_text: "cream cheese stove",
        result: "failure",
        src: "goal_different_prompt/goal_task00_episode00_open_the_middle_drawer_of_the_cabinet_prompt_cream_cheese_stove_failure.mp4",
        notes: "The result looks like shallow recombination of known actions rather than grounded interpretation."
      }
    ]
  }
];

window.SITE_CONTENT.downloads = [
  { label: "Manuscript source (main.tex)", href: "downloads/main.tex" },
  { label: "OpenVLA-OFT summary CSV", href: "downloads/openvla_summary.csv" },
  { label: "OpenVLA-OFT rollout-level CSV", href: "downloads/openvla_rollout_results.csv" },
  { label: "pi0.5 empty-prompt Spatial log", href: "downloads/pi05_empty_prompt_spatial.log" },
  { label: "pi0.5 empty-prompt Object log", href: "downloads/pi05_empty_prompt_object.log" }
];

window.SITE_CONTENT.hero = {
  title: "On the Instruction-Following Limitations of Vision-Language-Action Models on LIBERO",
  lab: "Computer Security & Privacy Laboratory @WashU",
  subtitle: "LIBERO-finetuned VLAs often recover the task from the scene instead of from the prompt."
};

window.SITE_CONTENT.sections = {
  introduction: {
    paragraphs: [
      "LIBERO is widely used to evaluate vision-language-action models. We study whether LIBERO-finetuned VLAs actually follow the language instruction, or instead infer the task from the scene.",
      "We find that, in the Spatial and Object suites, benchmark success often survives prompt removal or contradiction. This suggests that the models are not using language as the primary task signal; instead, they often recover the task from the scene layout."
    ]
  },
  results: {
    intro:
      "The table below summarizes the main finding using only Spatial and Object, where each task is associated with a different scene configuration.",
    highlight:
      "LIBERO-finetuned VLAs often recover the task from the scene instead of from the prompt."
  },
  openvla: {
    intro:
      "We evaluate the combined OpenVLA-OFT checkpoint on representative Spatial and Object tasks under standard, empty, and contradictory prompts.",
    conclusion:
      "This suggests that the VLA does not exhibit semantic instruction following; it mainly recovers the task from the scene."
  },
  pi05: {
    intro:
      "pi0.5 shows the same pattern on the cream-cheese task. Changing or removing the prompt does not reliably redirect the behavior to the newly specified object.",
    note:
      "The muted pi0.5 prompt is a single blank space rather than a strict empty string. This remains a near-empty language ablation."
  },
  shuffle: {
    intro:
      "We further perturb the Object suite by changing object layout. Once the positional regularity is broken, performance drops sharply and the shortcut becomes explicit."
  },
  conclusion: {
    paragraphs: [
      "LIBERO is a good benchmark for robotics, but it has limitations when evaluating VLA models.",
      "In particular, the Spatial and Object suites can reward scene-based task recovery, which overstates instruction-following ability."
    ]
  }
};

window.SITE_CONTENT.overall_results = [
  {
    model: "OpenVLA-OFT",
    condition: "Standard prompt",
    scope: "Spatial + Object (200 episodes)",
    result: "195/200 (97.5%)"
  },
  {
    model: "OpenVLA-OFT",
    condition: "Empty prompt",
    scope: "Spatial + Object (200 episodes)",
    result: "179/200 (89.5%)"
  },
  {
    model: "OpenVLA-OFT",
    condition: "\"Don't do anything\"",
    scope: "Spatial + Object (200 episodes)",
    result: "181/200 (90.5%)"
  },
  {
    model: "pi0.5",
    condition: "Official baseline",
    scope: "Spatial (500 episodes)",
    result: "492/500 (98.4%)"
  },
  {
    model: "pi0.5",
    condition: "Muted prompt (' ')",
    scope: "Spatial + Object (200 episodes)",
    result: "121/200 (60.5%)"
  }
];

window.SITE_CONTENT.openvla_modules = [
  {
    title: "Spatial task",
    caption:
      "OpenVLA-OFT continues the same bowl-placement behavior even when the prompt is removed or contradicted.",
    videos: [
      {
        title: "Standard prompt",
        caption:
          "Task: pick up the black bowl between the plate and the ramekin and place it on the plate.",
        model: "openvla",
        suite: "spatial",
        condition: "task",
        prompt_text: "pick up the black bowl between the plate and the ramekin and place it on the plate",
        result: "success",
        src: "openvla_spatial/task.mp4",
        notes: "Aggregate Spatial success is 98%."
      },
      {
        title: "Empty prompt",
        caption: "Same scene and initial state, but the prompt is removed.",
        model: "openvla",
        suite: "spatial",
        condition: "empty",
        prompt_text: "",
        result: "success",
        src: "openvla_spatial/empty.mp4",
        notes: "Aggregate Spatial success remains 83%."
      },
      {
        title: "Contradictory prompt",
        caption: "Same scene with the instruction 'don't do anything'.",
        model: "openvla",
        suite: "spatial",
        condition: "do_nothing",
        prompt_text: "don't do anything",
        result: "success",
        src: "openvla_spatial/do_nothing.mp4",
        notes: "Aggregate Spatial success remains 84%."
      }
    ]
  },
  {
    title: "Object task",
    caption:
      "OpenVLA-OFT also keeps executing the original Object task after prompt removal or contradiction.",
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
        notes: "Aggregate Object success is 97%."
      },
      {
        title: "Empty prompt",
        caption: "Same task and initial state with the prompt removed.",
        model: "openvla",
        suite: "object",
        condition: "empty",
        prompt_text: "",
        result: "success",
        src: "openvla_object/empty.mp4",
        notes: "Aggregate Object success remains 96%."
      },
      {
        title: "Contradictory prompt",
        caption: "Same task with the instruction 'don't do anything'.",
        model: "openvla",
        suite: "object",
        condition: "do_nothing",
        prompt_text: "don't do anything",
        result: "success",
        src: "openvla_object/do_nothing.mp4",
        notes: "Aggregate Object success remains 97%."
      }
    ]
  }
];

window.SITE_CONTENT.pi05_modules = [
  {
    title: "Object prompt probes",
    caption:
      "On the same cream-cheese scene, pi0.5 often keeps the original behavior despite prompt removal or prompt editing.",
    videos: [
      {
        title: "Standard prompt",
        caption: "Original cream-cheese task under the baseline prompt.",
        model: "pi05",
        suite: "object",
        condition: "baseline",
        prompt_text: "pick up the cream cheese and place it in the basket",
        result: "success",
        src: "object_baseline/rollout_pick_up_the_cream_cheese_and_place_it_in_the_basket_success.mp4",
        notes: "Representative baseline rollout."
      },
      {
        title: "Blank prompt",
        caption: "The client sends a blank-space prompt on the same task.",
        model: "pi05",
        suite: "object",
        condition: "blank",
        prompt_text: " ",
        result: "success",
        src: "object_different_prompt/object_task01_episode00_pick_up_the_cream_cheese_and_place_it_in_the_basket_prompt_blank_success.mp4",
        notes: "Muted-prompt Object success is 60/100."
      },
      {
        title: "Don't do anything",
        caption: "Contradictory prompt on the same scene.",
        model: "pi05",
        suite: "object",
        condition: "contradictory",
        prompt_text: "Don't do anything",
        result: "success",
        src: "object_different_prompt/object_task01_episode00_pick_up_the_cream_cheese_and_place_it_in_the_basket_prompt_Don_t_do_anything_success.mp4",
        notes: "The arm still executes the original behavior."
      },
      {
        title: "Wrong-object prompt",
        caption: "Prompt edited to 'pick up the milk and place it in the basket'.",
        model: "pi05",
        suite: "object",
        condition: "wrong object",
        prompt_text: "pick up the milk and place it in the basket",
        result: "failure",
        src: "object_different_prompt/object_task01_episode00_pick_up_the_cream_cheese_and_place_it_in_the_basket_prompt_pick_up_the_milk_and_place_it_in_the_basket_failure.mp4",
        notes: "The behavior does not reliably re-ground to the new object."
      }
    ]
  }
];
