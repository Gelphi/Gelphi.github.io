var sphere = (function() {
    function createVertexData(){
		var recursionValue = document.getElementById("recursion").value;
		var output = document.getElementById("recVal")
		output.innerHTML = recursionValue;
		console.log('Rekursion Value '+recursionValue);
		// recursionValue.oninput = function(){
		// 	output.innerHTML = this.value;
		// }

		var vertices = [];
		var normals = [];
		var indicesLines = [];
		var indicesTris = [];

		 // add vertex to mesh, fix position to be on unit sphere, return index
		function addVertex(v) {
   
			var vertexLength = Math.sqrt(v.x * v.x + v.y * v.y + v.z *v.z) ;
			var normalX = v.x / vertexLength  ;
			var normalY = v.y / vertexLength;
			var normalZ = v.z / vertexLength; 
				 
			vertices.push(normalX , normalY, normalZ);
			normals.push(normalX, normalY, normalZ);
	  
			return (vertices.length / 3) - 1;
		}

		// return index of point in the middle of p1 and p2
		function getMiddlePoint(indexPoint1, indexPoint2) {
			 
			var p1 = getVertexFromArray(indexPoint1);
			var p2 = getVertexFromArray(indexPoint2);
	  
			var m = {
				x: (p1.x + p2.x) / 2.0,
				y: (p1.y + p2.y) / 2.0,
				z: (p1.z + p2.z) / 2.0,
			  };

			// first check if we have it already
			for (var i = 0; i < vertices.length; i += 3) {
			  if ((vertices[i] === m.x) && (vertices[i + 1] === m.y) && (vertices[i + 2] === m.z)) {
				return i / 3;
			  }
			}

			// not in cache, calculate it
			// add vertex makes sure point is on unit sphere

			return addVertex(m);
		}

		 // create 12 vertices of a icosahedron
		 var t = ((1.0 + Math.sqrt(5.0)) / 2.0);

		 addVertex({ x: -1, y: t, z: 0 });
		 addVertex({ x: 1, y: t, z: 0});
		 addVertex({ x: -1, y: -t, z: 0});
		 addVertex({ x: 1, y: -t, z: 0});
	 
		 addVertex({ x: 0, y: -1, z: t});
		 addVertex({ x: 0, y: 1, z: t});
		 addVertex({ x: 0, y: -1, z: -t});
		 addVertex({ x: 0, y: 1, z: -t});
	 
		 addVertex({ x: t, y: 0, z: -1});
		 addVertex({ x: t, y: 0, z: 1});
		 addVertex({ x: -t, y: 0, z: -1});
		 addVertex({ x: -t, y: 0, z: 1});

	 
		 // 5 faces around point 0
		 addIndex(indicesTris, indicesLines, { x: 0, y: 11, z: 5 });
		 addIndex(indicesTris, indicesLines, { x: 0, y: 5, z: 1 });
		 addIndex(indicesTris, indicesLines, { x: 0, y: 1, z: 7 });
		 addIndex(indicesTris, indicesLines, { x: 0, y: 7, z: 10 });
		 addIndex(indicesTris, indicesLines, { x: 0, y: 10, z: 11 });
	 
		 // 5 adjacent faces
		 addIndex(indicesTris, indicesLines, { x: 1, y: 5, z: 9 });
		 addIndex(indicesTris, indicesLines, { x: 5, y: 11, z: 4 });
		 addIndex(indicesTris, indicesLines, { x: 11, y: 10, z: 2 });
		 addIndex(indicesTris, indicesLines, { x: 10, y: 7, z: 6 });
		 addIndex(indicesTris, indicesLines, { x: 7, y: 1, z: 8 });
	 
		 // 5 faces around point 3
		 addIndex(indicesTris, indicesLines, { x: 3, y: 9, z: 4 });
		 addIndex(indicesTris, indicesLines, { x: 3, y: 4, z: 2 });
		 addIndex(indicesTris, indicesLines, { x: 3, y: 2, z: 6 });
		 addIndex(indicesTris, indicesLines, { x: 3, y: 6, z: 8 });
		 addIndex(indicesTris, indicesLines, { x: 3, y: 8, z: 9 });
	 
		 // 5 adjacent faces
		 addIndex(indicesTris, indicesLines, { x: 4, y: 9, z: 5 });
		 addIndex(indicesTris, indicesLines, { x: 2, y: 4, z: 11 });
		 addIndex(indicesTris, indicesLines, { x: 6, y: 2, z: 10 });
		 addIndex(indicesTris, indicesLines, { x: 8, y: 6, z: 7 });
		 addIndex(indicesTris, indicesLines, { x: 9, y: 8, z: 1 });
		 
	 
		 // refine triangles
		 for (var i = 0; i < recursionValue; i++) {
			
		   var iTries = [];
		   var iLines = [];
	 
		   for (var j = 0; j < indicesTris.length; j += 3) {
			// replace triangle by 4 triangles
			 var m1 = getMiddlePoint(indicesTris[j], indicesTris[j + 1]);
			 var m2 = getMiddlePoint(indicesTris[j + 1], indicesTris[j + 2]);
			 var m3 = getMiddlePoint(indicesTris[j + 2], indicesTris[j]);
	 
			 addIndex(iTries, iLines, { x: indicesTris[j], y: m1, z: m3 });
			 addIndex(iTries, iLines, { x: indicesTris[j + 1], y: m2, z: m1 });
			 addIndex(iTries, iLines, { x: indicesTris[j + 2], y: m3, z: m2 });
			 addIndex(iTries, iLines, { x: m1, y: m2, z: m3 });
		   }
		   
		   indicesTris = iTries;
		   indicesLines = iLines;
		 }
	 
		 //Return Index of the Vertex in the array
		 function getVertexFromArray(index) {
		   return {
			 x: vertices[3 * index],
			 y: vertices[3 * index + 1],
			 z: vertices[3 * index + 2],
		   };
		 }
	 
		 // Add Index of the Vertex to the array
		 function addIndex(iTries, iLines, vertex) {			
		   iTries.push(vertex.x, vertex.y, vertex.z);
		   iLines.push(vertex.x, vertex.y, vertex.y, vertex.z, vertex.z, vertex.x);
		 }

		 this.vertices = new Float32Array(vertices);
		 this.normals = new Float32Array(normals);
		 this.indicesLines = new Uint16Array(indicesLines);
		 this.indicesTris = new Uint16Array(indicesTris);
	   }	

	return {
		createVertexData : createVertexData
	}    
}());