import React, { useRef, useEffect, useState } from 'react';
import { useTheme } from '@/providers/ThemeProvider';

const ShaderBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { theme } = useTheme();
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Create intersection observer to only render when visible
    const observer = new IntersectionObserver(
      (entries) => {
        setIsVisible(entries[0].isIntersecting);
      },
      { threshold: 0.1 }
    );
    
    observer.observe(canvas);

    // Skip rendering if not visible
    if (!isVisible) return;

    const gl = canvas.getContext('webgl', { 
      powerPreference: 'high-performance',
      antialias: false 
    });
    
    if (!gl) return;

    const isDarkTheme = theme === 'dark';

    // Simplified vertex shader (unchanged)
    const vertexShaderSource = `
      attribute vec2 a_position;
      void main() {
        gl_Position = vec4(a_position, 0, 1);
      }
    `;

    // Optimized fragment shader with reduced complexity for better performance
    const fragmentShaderSource = `
      precision mediump float;
      uniform float u_time;
      uniform vec2 u_resolution;
      uniform vec2 u_mouse;
      uniform bool u_isDark;
      uniform float u_mousePressed;

      // Simplified noise function
      float snoise(vec2 v){
        return fract(sin(dot(v, vec2(12.9898, 78.233))) * 43758.5453);
      }

      void main() {
        vec2 st = gl_FragCoord.xy / u_resolution.xy;
        st.x *= u_resolution.x / u_resolution.y;
        
        vec2 mouse = u_mouse / u_resolution.xy;
        mouse.x *= u_resolution.x / u_resolution.y;
        
        float distance = length(st - mouse) * 2.0;
        
        // Reduced noise layers for better performance
        float noise1 = snoise(st * 2.0 + u_time * 0.1);
        float noise2 = snoise(st * 3.0 - u_time * 0.15);
        
        // Color palette based on theme
        vec3 baseColor;
        vec3 accentColor;
        
        if (u_isDark) {
            baseColor = vec3(0.05, 0.01, 0.15);
            accentColor = vec3(0.6, 0.5, 1.0); // Purple
        } else {
            baseColor = vec3(0.92, 0.95, 0.98);
            accentColor = vec3(0.4, 0.2, 0.8); // Lighter purple
        }
        
        // Simplified color mixing
        float finalNoise = mix(noise1, noise2, 0.5);
        vec3 color = mix(baseColor, accentColor, finalNoise * 0.6);
        
        // Add subtle mouse interaction
        float mouseEffect = smoothstep(0.5, 0.0, distance);
        color += accentColor * mouseEffect * 0.2 * u_mousePressed;
        
        gl_FragColor = vec4(color, 1.0);
      }
    `;

    // Create shaders and program (keep existing code)
    const vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexShaderSource);
    const fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource);
    const program = createProgram(gl, vertexShader, fragmentShader);

    // Get locations (keep existing code)
    const positionAttributeLocation = gl.getAttribLocation(program, 'a_position');
    const timeUniformLocation = gl.getUniformLocation(program, 'u_time');
    const resolutionUniformLocation = gl.getUniformLocation(program, 'u_resolution');
    const mouseUniformLocation = gl.getUniformLocation(program, 'u_mouse');
    const isDarkUniformLocation = gl.getUniformLocation(program, 'u_isDark');
    const mousePressedUniformLocation = gl.getUniformLocation(program, 'u_mousePressed');

    // Create buffer (keep existing code)
    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([
        -1, -1,
         1, -1,
        -1,  1,
        -1,  1,
         1, -1,
         1,  1,
      ]),
      gl.STATIC_DRAW
    );

    // Setup mouse tracking with throttling
    let mouseX = 0;
    let mouseY = 0;
    let isMousePressed = 0;
    let lastTime = 0;
    const throttleTime = 30; // ms
    
    const handleMouseMove = (e: MouseEvent) => {
      const currentTime = Date.now();
      if (currentTime - lastTime < throttleTime) return;
      
      lastTime = currentTime;
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
    
    // Optimized touch handlers
    const handleTouchMove = (e: TouchEvent) => {
      const currentTime = Date.now();
      if (currentTime - lastTime < throttleTime) return;
      
      lastTime = currentTime;
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

    // Use passive event listeners for better performance
    document.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mousedown', handleMouseDown, { passive: true });
    document.addEventListener('mouseup', handleMouseUp, { passive: true });
    document.addEventListener('touchmove', handleTouchMove, { passive: true });
    document.addEventListener('touchstart', handleTouchStart, { passive: true });
    document.addEventListener('touchend', handleTouchEnd, { passive: true });

    // Handle resize with debouncing
    let resizeTimeout: number | null = null;
    const handleResize = () => {
      if (resizeTimeout) {
        window.clearTimeout(resizeTimeout);
      }
      
      resizeTimeout = window.setTimeout(() => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        gl.viewport(0, 0, canvas.width, canvas.height);
      }, 100);
    };
    
    window.addEventListener('resize', handleResize, { passive: true });
    handleResize();

    // Start time for animation
    const startTime = Date.now();
    let animationId: number;
    let lastFrameTime = 0;
    const targetFPS = 30;
    const frameInterval = 1000 / targetFPS;

    // Animation loop with frame rate control
    const render = (currentTime: number) => {
      const elapsedTime = currentTime - lastFrameTime;
      
      if (elapsedTime > frameInterval) {
        lastFrameTime = currentTime - (elapsedTime % frameInterval);
        
        // Only render if visible
        if (isVisible) {
          // Calculate time in seconds
          const timeInSeconds = (Date.now() - startTime) / 1000;
        
          gl.clearColor(0, 0, 0, 0);
          gl.clear(gl.COLOR_BUFFER_BIT);
        
          gl.useProgram(program);
          
          // Update uniforms
          gl.uniform1f(timeUniformLocation, timeInSeconds);
          gl.uniform2f(resolutionUniformLocation, canvas.width, canvas.height);
          gl.uniform2f(mouseUniformLocation, mouseX, mouseY);
          gl.uniform1i(isDarkUniformLocation, isDarkTheme ? 1 : 0);
          gl.uniform1f(mousePressedUniformLocation, isMousePressed);
        
          // Setup attribute
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
          gl.drawArrays(gl.TRIANGLES, 0, 6);
        }
      }
      
      animationId = requestAnimationFrame(render);
    };

    animationId = requestAnimationFrame(render);

    // Helper functions (keep existing code)
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
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
      observer.disconnect();
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchstart', handleTouchStart);
      document.removeEventListener('touchend', handleTouchEnd);
      window.removeEventListener('resize', handleResize);
      
      if (resizeTimeout) {
        window.clearTimeout(resizeTimeout);
      }
    };
  }, [theme, isVisible]);

  return (
    <canvas 
      ref={canvasRef} 
      className="fixed inset-0 w-full h-full pointer-events-none z-0"
    />
  );
};

export default ShaderBackground;
