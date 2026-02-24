'use client';

import {
  Contact,
  Globe,
  Mail,
  MessageSquare,
  Phone,
  Wifi,
} from 'lucide-react';
import { useCallback, useEffect, useState } from 'react';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

import { EmailForm, buildEmailString } from './forms/email-form';
import { PhoneForm, buildPhoneString } from './forms/phone-form';
import { TextForm } from './forms/text-form';
import { UrlForm } from './forms/url-form';
import { VCardForm, buildVCardString } from './forms/vcard-form';
import { WifiForm, buildWifiString } from './forms/wifi-form';
import { QRCustomization } from './qr-customization';
import { QRDisplay } from './qr-display';
import { QRDownload } from './qr-download';
import { DEFAULT_QR_OPTIONS, type QROptions } from './qr-options';

const QR_OPTIONS_STORAGE_KEY = 'qrcraft-qr-options';

type QRCodeStylingType = import('qr-code-styling').default;

const QR_TYPES = [
  { id: 'text', label: 'Text', icon: MessageSquare },
  { id: 'url', label: 'URL', icon: Globe },
  { id: 'wifi', label: 'WiFi', icon: Wifi },
  { id: 'email', label: 'Email', icon: Mail },
  { id: 'phone', label: 'Phone', icon: Phone },
  { id: 'vcard', label: 'VCard', icon: Contact },
] as const;

type QRType = (typeof QR_TYPES)[number]['id'];

export function QRGenerator() {
  const [activeType, setActiveType] = useState<QRType>('url');
  const [qrInstance, setQrInstance] = useState<QRCodeStylingType | null>(null);
  const [showCustomization, setShowCustomization] = useState(false);

  // Form data state
  const [textValue, setTextValue] = useState('');
  const [urlValue, setUrlValue] = useState('https://');
  const [wifiValue, setWifiValue] = useState({
    ssid: '',
    password: '',
    encryption: 'WPA',
    hidden: false,
  });
  const [emailValue, setEmailValue] = useState({
    address: '',
    subject: '',
    body: '',
  });
  const [phoneValue, setPhoneValue] = useState('');
  const [vcardValue, setVcardValue] = useState({
    firstName: '',
    lastName: '',
    organization: '',
    phone: '',
    email: '',
    website: '',
    address: '',
    note: '',
  });

  // QR styling options
  const [qrOptions, setQrOptions] = useState<QROptions>(DEFAULT_QR_OPTIONS);
  const [hydrated, setHydrated] = useState(false);

  // Load saved customization from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(QR_OPTIONS_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved) as Partial<QROptions>;
        setQrOptions((prev) => ({
          ...prev,
          ...parsed,
          logoUrl: '', // Don't restore logo (could be large base64)
          data: prev.data,
        }));
      }
    } catch {
      // Ignore parse errors
    }
    setHydrated(true);
  }, []);

  // Save customization to localStorage when it changes
  useEffect(() => {
    if (!hydrated) return;
    try {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { logoUrl, data, ...saveable } = qrOptions;
      localStorage.setItem(QR_OPTIONS_STORAGE_KEY, JSON.stringify(saveable));
    } catch {
      // Ignore quota errors
    }
  }, [qrOptions, hydrated]);

  // Build QR data string based on active type
  const getQRData = useCallback((): string => {
    switch (activeType) {
      case 'text':
        return textValue || ' ';
      case 'url':
        return urlValue || 'https://';
      case 'wifi':
        return wifiValue.ssid ? buildWifiString(wifiValue) : ' ';
      case 'email':
        return emailValue.address ? buildEmailString(emailValue) : ' ';
      case 'phone':
        return phoneValue ? buildPhoneString(phoneValue) : ' ';
      case 'vcard':
        return vcardValue.firstName || vcardValue.lastName
          ? buildVCardString(vcardValue)
          : ' ';
      default:
        return ' ';
    }
  }, [
    activeType,
    textValue,
    urlValue,
    wifiValue,
    emailValue,
    phoneValue,
    vcardValue,
  ]);

  const currentOptions: QROptions = {
    ...qrOptions,
    data: getQRData(),
  };

  return (
    <div id="generator" className="w-full scroll-mt-20">
      <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[1fr_auto]">
        {/* Left: Input Forms */}
        <div className="space-y-6">
          <Card>
            <CardHeader className="pb-4">
              <CardTitle className="text-xl">Create QR Code</CardTitle>
              <CardDescription>
                Choose a content type and enter your data
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs
                value={activeType}
                onValueChange={(v) => setActiveType(v as QRType)}
              >
                <TabsList className="mb-4 grid w-full grid-cols-3 sm:grid-cols-6">
                  {QR_TYPES.map((type) => {
                    const Icon = type.icon;
                    return (
                      <TabsTrigger
                        key={type.id}
                        value={type.id}
                        className="gap-1.5 text-xs"
                      >
                        <Icon className="size-3.5" />
                        <span className="hidden sm:inline">{type.label}</span>
                      </TabsTrigger>
                    );
                  })}
                </TabsList>

                <TabsContent value="text">
                  <TextForm value={textValue} onChange={setTextValue} />
                </TabsContent>
                <TabsContent value="url">
                  <UrlForm value={urlValue} onChange={setUrlValue} />
                </TabsContent>
                <TabsContent value="wifi">
                  <WifiForm value={wifiValue} onChange={setWifiValue} />
                </TabsContent>
                <TabsContent value="email">
                  <EmailForm value={emailValue} onChange={setEmailValue} />
                </TabsContent>
                <TabsContent value="phone">
                  <PhoneForm value={phoneValue} onChange={setPhoneValue} />
                </TabsContent>
                <TabsContent value="vcard">
                  <VCardForm value={vcardValue} onChange={setVcardValue} />
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          {/* Customization Panel */}
          <Card>
            <CardHeader className="pb-4">
              <button
                onClick={() => setShowCustomization(!showCustomization)}
                className="flex w-full items-center justify-between"
              >
                <div className="text-left">
                  <CardTitle className="text-xl">Customize</CardTitle>
                  <CardDescription>
                    Colors, dot style, logo, and more
                  </CardDescription>
                </div>
                <div
                  className={`text-muted-foreground transition-transform ${showCustomization ? 'rotate-180' : ''}`}
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                </div>
              </button>
            </CardHeader>
            {showCustomization && (
              <CardContent>
                <Separator className="mb-5" />
                <QRCustomization
                  options={qrOptions}
                  onChange={setQrOptions}
                />
              </CardContent>
            )}
          </Card>
        </div>

        {/* Right: QR Preview & Download */}
        <div className="lg:sticky lg:top-20 lg:self-start">
          <div className="space-y-4">
            <QRDisplay
              options={currentOptions}
              onQRReady={setQrInstance}
              className="mx-auto"
            />
            <QRDownload qrInstance={qrInstance} />
          </div>
        </div>
      </div>
    </div>
  );
}
