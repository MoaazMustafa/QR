import type { Options } from 'qr-code-styling';

export type DotType =
  | 'square'
  | 'dots'
  | 'rounded'
  | 'classy'
  | 'classy-rounded'
  | 'extra-rounded';

export type CornerSquareType = 'square' | 'dot' | 'extra-rounded';

export type CornerDotType = 'square' | 'dot';

export type ErrorCorrectionLevel = 'L' | 'M' | 'Q' | 'H';

export interface QROptions {
  data: string;
  width: number;
  height: number;
  margin: number;
  fgColor: string;
  bgColor: string;
  dotType: DotType;
  cornerSquareType: CornerSquareType;
  cornerDotType: CornerDotType;
  errorCorrection: ErrorCorrectionLevel;
  logoUrl: string;
  logoSize: number;
  logoMargin: number;
  logoClearBg: boolean;
}

export const DEFAULT_QR_OPTIONS: QROptions = {
  data: 'https://qrcraft.dev',
  width: 300,
  height: 300,
  margin: 10,
  fgColor: '#000000',
  bgColor: '#ffffff',
  dotType: 'rounded',
  cornerSquareType: 'extra-rounded',
  cornerDotType: 'dot',
  errorCorrection: 'Q',
  logoUrl: '',
  logoSize: 0.4,
  logoMargin: 5,
  logoClearBg: true,
};

export function buildQRCodeStylingOptions(options: QROptions): Options {
  const config: Options = {
    width: options.width,
    height: options.height,
    margin: options.margin,
    data: options.data || ' ',
    type: 'canvas',
    dotsOptions: {
      color: options.fgColor,
      type: options.dotType,
    },
    backgroundOptions: {
      color: options.bgColor,
    },
    cornersSquareOptions: {
      color: options.fgColor,
      type: options.cornerSquareType,
    },
    cornersDotOptions: {
      color: options.fgColor,
      type: options.cornerDotType,
    },
    qrOptions: {
      errorCorrectionLevel: options.errorCorrection,
    },
    imageOptions: {
      crossOrigin: 'anonymous',
      margin: options.logoMargin,
      imageSize: options.logoSize,
      hideBackgroundDots: options.logoClearBg,
    },
  };

  if (options.logoUrl) {
    config.image = options.logoUrl;
  }

  return config;
}
