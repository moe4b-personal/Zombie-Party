﻿using System;
using System.IO;
using System.Linq;
using System.Collections;
using System.Collections.Generic;

using UnityEngine;
using UnityEngine.UI;
using UnityEngine.SceneManagement;
using UnityEngine.AI;

#if UNITY_EDITOR
using UnityEditor;
using UnityEditorInternal;
#endif

using Object = UnityEngine.Object;
using Random = UnityEngine.Random;

namespace Game
{
	public class WeaponRaycastTracer : Weapon.Module
	{
        WeaponRaycastAction raycast;

        [SerializeField]
        protected Transform start;

        [SerializeField]
        protected LineRenderer line;

        public override void Init(Weapon weapon)
        {
            base.Init(weapon);

            weapon.ProcessEvent += Process;

            raycast = weapon.FindModule<WeaponRaycastAction>();

            raycast.OnHit += OnHit;
        }

        void Process(bool input)
        {
            line.SetPosition(0, start.position);
        }

        void OnHit(RaycastHit obj)
        {
            line.SetPosition(1, obj.point);
        }
    }
}