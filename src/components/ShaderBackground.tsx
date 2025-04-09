
import React, { useRef, useEffect } from 'react';
import { useTheme } from '@/providers/ThemeProvider';

const ShaderBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { theme } = useTheme();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext('webgl');
    if (!gl) return;

    const isDarkTheme = theme === 'dark';

    const vertexShaderSource = `
      attribute vec2 a_position;
      void main() {
        gl_Position = vec4(a_position, 0, 1);
      }
    `;

    const fragmentShaderSource = `
      precision mediump float;
      uniform float u_time;
      uniform vec2 u_resolution;
      uniform vec2 u_mouse;
      uniform bool u_isDark;
      uniform float u_mousePressed;

      // Simplex noise function
      vec3 permute(vec3 x) { return mod(((x*34.0)+1.0)*x, 289.0); }
      
      float snoise(vec2 v){
        const vec4 C = vec4(0.211324865405187, 0.366025403784439,
                -0.577350269189626, 0.024390243902439);
        vec2 i  = floor(v + dot(v, C.yy) );
        vec2 x0 = v -   i + dot(i, C.xx);
        vec2 i1;
        i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
        vec4 x12 = x0.xyxy + C.xxzz;
        x12.xy -= i1;
        i = mod(i, 289.0);
        vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 ))
        + i.x + vec3(0.0, i1.x, 1.0 ));
        vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy),
          dot(x12.zw,x12.zw)), 0.0);
        m = m*m ;
        m = m*m ;
        vec3 x = 2.0 * fract(p * C.www) - 1.0;
        vec3 h = abs(x) - 0.5;
        vec3 ox = floor(x + 0.5);
        vec3 a0 = x - ox;
        m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );
        vec3 g;
        g.x  = a0.x  * x0.x  + h.x  * x0.y;
        g.yz = a0.yz * x12.xz + h.yz * x12.yw;
        return 130.0 * dot(m, g);
      }

      // Vortex function
      float vortex(vec2 uv, vec2 center, float radius, float strength) {
        vec2 delta = uv - center;
        float dist = length(delta);
        float angle = strength * smoothstep(radius, 0.0, dist);
        float c = cos(angle);
        float s = sin(angle);
        return snoise(vec2(
          uv.x * c - uv.y * s,
          uv.x * s + uv.y * c
        ));
      }

      void main() {
        vec2 st = gl_FragCoord.xy / u_resolution.xy;
        st.x *= u_resolution.x / u_resolution.y;
        
        vec2 mouse = u_mouse / u_resolution.xy;
        mouse.x *= u_resolution.x / u_resolution.y;
        
        float distance = length(st - mouse) * 2.0;
        
        // Multiple layers of noise with vortex effect around mouse
        float noise1 = snoise(st * 3.0 + u_time * 0.1);
        float noise2 = snoise(st * 5.0 - u_time * 0.15);
        float noise3 = snoise(st * 8.0 + u_time * 0.05);
        
        // Add vortex effect near mouse position
        float vortexEffect = vortex(st, mouse, 0.5, 3.0 + u_mousePressed * 5.0);
        
        // Combine noise layers with vortex
        float finalNoise = noise1 * 0.5 + noise2 * 0.3 + noise3 * 0.2 + vortexEffect * 0.2;
        
        // Create a distortion effect near mouse position
        float mouseEffect = smoothstep(0.5, 0.0, distance);
        finalNoise = mix(finalNoise, finalNoise * 1.5, mouseEffect);
        
        // Color palette based on theme
        vec3 baseColor;
        vec3 accentColor;
        vec3 highlightColor;
        
        if (u_isDark) {
            // Dark theme colors - cosmic purples and blues
            baseColor = vec3(0.05, 0.01, 0.15);
            accentColor = vec3(0.6, 0.5, 1.0); // Purple
            highlightColor = vec3(0.8, 0.3, 1.0); // Bright purple
        } else {
            // Light theme colors - soft blues and whites
            baseColor = vec3(0.92, 0.95, 0.98);
            accentColor = vec3(0.4, 0.2, 0.8); // Lighter purple
            highlightColor = vec3(0.2, 0.1, 0.5); // Deep purple
        }
        
        // Add time-based color shifting
        float colorShift = sin(u_time * 0.1) * 0.1;
        accentColor.r += colorShift;
        accentColor.b -= colorShift * 0.5;
        
        // Mix colors based on noise
        vec3 color = mix(baseColor, accentColor, finalNoise * 0.6 + mouseEffect * 0.4);
        
        // Add subtle glow around mouse when pressed
        color += highlightColor * mouseEffect * mouseEffect * u_mousePressed;
        
        // Add subtle pulse effect
        float pulse = (sin(u_time * 0.5) + 1.0) * 0.05;
        color += accentColor * pulse;
        
        gl_FragColor = vec4(color, 1.0);
      }
    `;

    // Compile and link shaders
    const vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexShaderSource);
    const fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource);
    const program = createProgram(gl, vertexShader, fragmentShader);

    // Get attribute and uniform locations
    const positionAttributeLocation = gl.getAttribLocation(program, 'a_position');
    const timeUniformLocation = gl.getUniformLocation(program, 'u_time');
    const resolutionUniformLocation = gl.getUniformLocation(program, 'u_resolution');
    const mouseUniformLocation = gl.getUniformLocation(program, 'u_mouse');
    const isDarkUniformLocation = gl.getUniformLocation(program, 'u_isDark');
    const mousePressedUniformLocation = gl.getUniformLocation(program, 'u_mousePressed');

    // Create a buffer and put a single rectangle in it (2 triangles)
    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([
        -1, -1,  // Bottom left
         1, -1,  // Bottom right
        -1,  1,  // Top left
        -1,  1,  // Top left
         1, -1,  // Bottom right
         1,  1,  // Top right
      ]),
      gl.STATIC_DRAW
    );

    // Setup mouse tracking
    let mouseX = 0;
    let mouseY = 0;
    let isMousePressed = 0;
    
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseX = e.clientX - rect.left;
      mouseY = rect.height - (e.clientY - rect.top);
    };
    
    const handleMouseDown = () => {
      isMousePressed = 1;
    };
    
    const handleMouseUp = () => {
      isMousePressed = 0;
    };
    
    // Add touch support for mobile
    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        const rect = canvas.getBoundingClientRect();
        mouseX = e.touches[0].clientX - rect.left;
        mouseY = rect.height - (e.touches[0].clientY - rect.top);
      }
    };
    
    const handleTouchStart = (e: TouchEvent) => {
      isMousePressed = 1;
      handleTouchMove(e);
    };
    
    const handleTouchEnd = () => {
      isMousePressed = 0;
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('touchmove', handleTouchMove);
    document.addEventListener('touchstart', handleTouchStart);
    document.addEventListener('touchend', handleTouchEnd);

    // Handle resize
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      gl.viewport(0, 0, canvas.width, canvas.height);
    };
    window.addEventListener('resize', handleResize);
    handleResize();

    // Start time for animation
    const startTime = Date.now();

    // Animation loop
    const render = () => {
      // Pass elapsed time to shader
      const currentTime = (Date.now() - startTime) / 1000; // Convert to seconds

      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT);

      gl.useProgram(program);
      
      // Update uniforms
      gl.uniform1f(timeUniformLocation, currentTime);
      gl.uniform2f(resolutionUniformLocation, canvas.width, canvas.height);
      gl.uniform2f(mouseUniformLocation, mouseX, mouseY);
      gl.uniform1i(isDarkUniformLocation, isDarkTheme ? 1 : 0);
      gl.uniform1f(mousePressedUniformLocation, isMousePressed);

      // Set up position attribute
      gl.enableVertexAttribArray(positionAttributeLocation);
      gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
      gl.vertexAttribPointer(
        positionAttributeLocation,
        2,          // 2 components per vertex
        gl.FLOAT,   // Data type
        false,      // Don't normalize
        0,          // Stride (0 = auto)
        0           // Offset
      );

      // Draw
      gl.drawArrays(
        gl.TRIANGLES,
        0,          // Offset
        6           // Vertex count
      );

      requestAnimationFrame(render);
    };

    render();

    // Helper functions for compiling shaders
    function createShader(gl: WebGLRenderingContext, type: number, source: string) {
      const shader = gl.createShader(type);
      if (!shader) throw new Error('Failed to create shader');
      
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      
      const success = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
      if (!success) {
        console.error(gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
        throw new Error('Failed to compile shader');
      }
      
      return shader;
    }

    function createProgram(gl: WebGLRenderingContext, vertexShader: WebGLShader, fragmentShader: WebGLShader) {
      const program = gl.createProgram();
      if (!program) throw new Error('Failed to create program');
      
      gl.attachShader(program, vertexShader);
      gl.attachShader(program, fragmentShader);
      gl.linkProgram(program);
      
      const success = gl.getProgramParameter(program, gl.LINK_STATUS);
      if (!success) {
        console.error(gl.getProgramInfoLog(program));
        gl.deleteProgram(program);
        throw new Error('Failed to link program');
      }
      
      return program;
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchstart', handleTouchStart);
      document.removeEventListener('touchend', handleTouchEnd);
      window.removeEventListener('resize', handleResize);
    };
  }, [theme]);

  return (
    <canvas 
      ref={canvasRef} 
      className="fixed inset-0 w-full h-full pointer-events-none z-0"
    />
  );
};

export default ShaderBackground;
