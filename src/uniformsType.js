// @flow
import {
  SRLOG
} from './prefixLogs';

const INT = 'int';
const FLOAT = 'float';

type Uniforms = {
  '1i': number,
  '2i': Array<number>,
  '3i': Array<number>,
  '4i': Array<number>,
  '1f': number,
  '2f': Array<number>,
  '3f': Array<number>,
  '4f': Array<number>,
  '1iv': Array<number>,
  '2iv': Array<number>,
  '3iv': Array<number>,
  '4iv': Array<number>,
  '1fv': Array<number>,
  '2fv': Array<number>,
  '3fv': Array<number>,
  '4fv': Array<number>,
  'Matrix3fv': Array<number>,
  'Matrix4fv': Array<number>,
};

export const processUniform = (gl: WebGLContext, location, type: Uniforms, value: number | string | Array<number> ) => {
  switch (type) {
    case '1f':
      gl.uniform1f(location, value);
      break;
    case '2f':
      gl.uniform2f(location, value[0], value[1]);
      break;
    case '3f':
      gl.uniform3f(location, value[0], value[1], value[2]);
      break;
    case '4f':
      gl.uniform4f(location, value[0], value[1], value[2], value[3]);
      break;
    case '1i':
      gl.uniform1i(location, value);
      break;
    case '2i':
      gl.uniform2i(location, value[0], value[1]);
      break;
    case '3i':
      gl.uniform3i(location, value[0], value[1], value[2]);
      break;
    case '4i':
      gl.uniform3i(location, value[0], value[1], value[2], value[3]);
      break;
    case '1iv':
      gl.uniform1iv(location, value);
      break;
    case '2iv':
      gl.uniform2iv(location, value);
      break;
    case '3iv':
      gl.uniform3iv(location, value);
      break;
    case '4iv':
      gl.uniform4iv(location, value);
      break;
    case '1fv':
      gl.uniform1fv(location, value);
      break;
    case '2fv':
      gl.uniform2fv(location, value);
      break;
    case '3fv':
      gl.uniform3fv(location, value);
      break;
    case '4fv':
      gl.uniform4fv(location, value);
      break;
    case 'Matrix2fv':
      gl.uniformMatrix2fv(location, false, value);
      break;
    case 'Matrix3fv':
      gl.uniformMatrix3fv(location, false, value);
      break;
    case 'Matrix4fv':
      gl.uniformMatrix4fv(location, false, value);
      break;
    default:
      break;
  }
}

export const uniformTypeToGLSLType = (type: string) => {
  switch (type) {
    case '1f':
      return FLOAT;
    case '2f':
      return 'vec2';
    case '3f':
      return 'vec3';
    case '4f':
      return 'vec4';
    case '1i':
      return INT;
    case '2i':
      return 'ivec2';
    case '3i':
      return 'ivec3';
    case '4i':
      return 'ivec4';
    case '1iv':
      return INT;
    case '2iv':
      return 'ivec2';
    case '3iv':
      return 'ivec3';
    case '4iv':
      return 'ivec4';
    case '1fv':
      return 'float';
    case '2fv':
      return 'vec2';
    case '3fv':
      return 'vec3';
    case '4fv':
      return 'vec4';
    case 'Matrix2fv':
      return 'mat2';
      break;
    case 'Matrix3fv':
      return 'mat3';
    case 'Matrix4fv':
      return 'mat4';
    default:
      console.error(SRLOG `The uniform type "${type}" is not valid, please make sure your uniform type is valid`);
  }
}