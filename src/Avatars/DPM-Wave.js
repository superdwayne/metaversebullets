import React, { useRef, useEffect } from 'react'
import { useGLTF, useAnimations } from '@react-three/drei'

export default function ModelWave({ ...props }) {

  const group = useRef()
  const { nodes, materials, animations } = useGLTF('https://cdn-static.farfetch-contents.com/Content/UP/EXPERIENCE/Metaverse/wave-v2.glb')
  const { actions } = useAnimations(animations, group)

  useEffect(() => {
  
    actions.WAVE.play()
    group.current.position.x = 0;
    group.current.position.y = -3;
    group.current.position.z = -2;

     });
 

  return (

<>

    
<group ref={group} {...props} dispose={null}>
      <primitive object={nodes.Hips} />
      <skinnedMesh
        geometry={nodes.Wolf3D_Body001.geometry}
        material={materials.Wolf3D_Body}
        skeleton={nodes.Wolf3D_Body001.skeleton}
      />
      <skinnedMesh
        geometry={nodes.Wolf3D_Hair002.geometry}
        material={materials['Wolf3D_Hair.001']}
        skeleton={nodes.Wolf3D_Hair002.skeleton}
      />
      <skinnedMesh
        geometry={nodes.Wolf3D_Outfit_Bottom002.geometry}
        material={materials['Wolf3D_Outfit_Bottom.001']}
        skeleton={nodes.Wolf3D_Outfit_Bottom002.skeleton}
      />
      <skinnedMesh
        geometry={nodes.Wolf3D_Outfit_Footwear002.geometry}
        material={materials['Wolf3D_Outfit_Footwear.001']}
        skeleton={nodes.Wolf3D_Outfit_Footwear002.skeleton}
      />
      <skinnedMesh
        geometry={nodes.Wolf3D_Outfit_Top002.geometry}
        material={materials['Wolf3D_Outfit_Top.001']}
        skeleton={nodes.Wolf3D_Outfit_Top002.skeleton}
      />
      <skinnedMesh
        name="EyeLeft002"
        geometry={nodes.EyeLeft002.geometry}
        material={nodes.EyeLeft002.material}
        skeleton={nodes.EyeLeft002.skeleton}
        morphTargetDictionary={nodes.EyeLeft002.morphTargetDictionary}
        morphTargetInfluences={nodes.EyeLeft002.morphTargetInfluences}
      />
      <skinnedMesh
        name="EyeRight002"
        geometry={nodes.EyeRight002.geometry}
        material={nodes.EyeRight002.material}
        skeleton={nodes.EyeRight002.skeleton}
        morphTargetDictionary={nodes.EyeRight002.morphTargetDictionary}
        morphTargetInfluences={nodes.EyeRight002.morphTargetInfluences}
      />
      <skinnedMesh
        name="Wolf3D_Beard001"
        geometry={nodes.Wolf3D_Beard001.geometry}
        material={materials.Wolf3D_Beard}
        skeleton={nodes.Wolf3D_Beard001.skeleton}
        morphTargetDictionary={nodes.Wolf3D_Beard001.morphTargetDictionary}
        morphTargetInfluences={nodes.Wolf3D_Beard001.morphTargetInfluences}
      />
      <skinnedMesh
        name="Wolf3D_Head002"
        geometry={nodes.Wolf3D_Head002.geometry}
        material={materials['Wolf3D_Skin.001']}
        skeleton={nodes.Wolf3D_Head002.skeleton}
        morphTargetDictionary={nodes.Wolf3D_Head002.morphTargetDictionary}
        morphTargetInfluences={nodes.Wolf3D_Head002.morphTargetInfluences}
      />
      <skinnedMesh
        name="Wolf3D_Teeth002"
        geometry={nodes.Wolf3D_Teeth002.geometry}
        material={materials['Wolf3D_Teeth.001']}
        skeleton={nodes.Wolf3D_Teeth002.skeleton}
        morphTargetDictionary={nodes.Wolf3D_Teeth002.morphTargetDictionary}
        morphTargetInfluences={nodes.Wolf3D_Teeth002.morphTargetInfluences}
      />
    </group>
    </>
  )
}

useGLTF.preload('https://cdn-static.farfetch-contents.com/Content/UP/EXPERIENCE/Metaverse/wave-v2.glb')
