'use client';

import * as React from 'react';
import PageHeader from '@/components/shared/PageHeader';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/Tabs';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/Select';
import { Save, User, ShieldCheck, CheckCircle2, Warehouse, RefreshCw } from 'lucide-react';

export default function SettingsPage() {
  // Tabs active state is managed inside Tabs Primitive
  
  // Profile settings state
  const [name, setName] = React.useState('John Doe');
  const [email, setEmail] = React.useState('john.doe@pharmastock.pro');
  const [role, setRole] = React.useState('Inventory Manager');
  const [profileSaving, setProfileSaving] = React.useState(false);
  const [profileSuccess, setProfileSuccess] = React.useState(false);

  // Warehouse settings state
  const [facility, setFacility] = React.useState('Warehouse A-12');
  const [subzone, setSubzone] = React.useState('Cold Storage Unit 3');
  const [sysID, setSysID] = React.useState('SYS-WH-982-A');
  const [facilitySaving, setFacilitySaving] = React.useState(false);
  const [facilitySuccess, setFacilitySuccess] = React.useState(false);

  // Security settings state
  const [tfaEnabled, setTfaEnabled] = React.useState(true);
  const [timeout, setTimeoutVal] = React.useState('30 min');
  const [autoQuarantine, setAutoQuarantine] = React.useState(true);
  const [securitySaving, setSecuritySaving] = React.useState(false);
  const [securitySuccess, setSecuritySuccess] = React.useState(false);

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    setProfileSaving(true);
    setProfileSuccess(false);

    setTimeout(() => {
      setProfileSaving(false);
      setProfileSuccess(true);
    }, 1000);
  };

  const handleSaveFacility = (e: React.FormEvent) => {
    e.preventDefault();
    setFacilitySaving(true);
    setFacilitySuccess(false);

    setTimeout(() => {
      setFacilitySaving(false);
      setFacilitySuccess(true);
    }, 1000);
  };

  const handleSaveSecurity = (e: React.FormEvent) => {
    e.preventDefault();
    setSecuritySaving(true);
    setSecuritySuccess(false);

    setTimeout(() => {
      setSecuritySaving(false);
      setSecuritySuccess(true);
    }, 1000);
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <PageHeader
        title="System Settings"
        description="Configure operator profiles, facility parameters, and logistics security rules."
      />

      <div className="max-w-4xl mx-auto bg-surface-container p-6 md:p-8 border border-outline/70 rounded-clinical">
        <Tabs defaultValue="profile">
          {/* Navigation Tab Bar */}
          <TabsList className="mb-8">
            <TabsTrigger value="profile" className="flex items-center gap-2">
              <User className="h-4 w-4" />
              OPERATOR PROFILE
            </TabsTrigger>
            <TabsTrigger value="facility" className="flex items-center gap-2">
              <Warehouse className="h-4 w-4" />
              FACILITY CREDENTIALS
            </TabsTrigger>
            <TabsTrigger value="security" className="flex items-center gap-2">
              <ShieldCheck className="h-4 w-4" />
              SECURITY PROTOCOLS
            </TabsTrigger>
          </TabsList>

          {/* TAB 1: Operator Profile */}
          <TabsContent value="profile">
            <form onSubmit={handleSaveProfile} className="space-y-6 max-w-xl">
              <div className="space-y-4">
                {/* Operator Name */}
                <div className="space-y-1.5">
                  <label className="font-label-caps text-[10px] text-on-surface-variant block uppercase font-semibold" htmlFor="op-name">
                    Full Operator Name
                  </label>
                  <input
                    id="op-name"
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="bg-surface-container-low border border-outline focus:border-accent text-on-surface w-full h-10 px-3 rounded-clinical font-mono-data focus:ring-0 focus:outline-none text-sm"
                  />
                </div>

                {/* Email Address */}
                <div className="space-y-1.5">
                  <label className="font-label-caps text-[10px] text-on-surface-variant block uppercase font-semibold" htmlFor="op-email">
                    Authorized Email Coordinates
                  </label>
                  <input
                    id="op-email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="bg-surface-container-low border border-outline focus:border-accent text-on-surface w-full h-10 px-3 rounded-clinical font-mono-data focus:ring-0 focus:outline-none text-sm"
                  />
                </div>

                {/* System Role */}
                <div className="space-y-1.5">
                  <label className="font-label-caps text-[10px] text-on-surface-variant block uppercase font-semibold" htmlFor="op-role">
                    Centralized Security Role
                  </label>
                  <input
                    id="op-role"
                    type="text"
                    disabled
                    value={role}
                    className="bg-surface-container-low/50 border border-outline/40 text-on-surface-variant/70 w-full h-10 px-3 rounded-clinical font-mono-data cursor-not-allowed text-sm"
                  />
                  <p className="text-[10px] text-text-muted">Security roles are managed by facility administrator portals.</p>
                </div>
              </div>

              {/* Feedback Success */}
              {profileSuccess && (
                <div className="p-3 bg-success/15 border border-success/35 text-success rounded-clinical flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4" />
                  <span className="text-xs font-semibold">Operator profile coordinates saved successfully.</span>
                </div>
              )}

              {/* Save Button */}
              <button
                type="submit"
                disabled={profileSaving}
                className="flex items-center justify-center gap-2 px-5 py-2.5 bg-primary text-on-primary-container hover:opacity-90 active:scale-95 disabled:opacity-50 disabled:pointer-events-none font-label-caps text-label-caps text-[10px] font-bold rounded-clinical transition-all text-on-primary"
              >
                {profileSaving ? <RefreshCw className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
                {profileSaving ? 'SAVING COORDINATES...' : 'SAVE PROFILE'}
              </button>
            </form>
          </TabsContent>

          {/* TAB 2: Facility Credentials */}
          <TabsContent value="facility">
            <form onSubmit={handleSaveFacility} className="space-y-6 max-w-xl">
              <div className="space-y-4">
                {/* Facility Identifier */}
                <div className="space-y-1.5">
                  <label className="font-label-caps text-[10px] text-on-surface-variant block uppercase font-semibold" htmlFor="fac-name">
                    Active Facility Identifier
                  </label>
                  <input
                    id="fac-name"
                    type="text"
                    required
                    value={facility}
                    onChange={(e) => setFacility(e.target.value)}
                    className="bg-surface-container-low border border-outline focus:border-accent text-on-surface w-full h-10 px-3 rounded-clinical font-mono-data focus:ring-0 focus:outline-none text-sm"
                  />
                </div>

                {/* Subzone */}
                <div className="space-y-1.5">
                  <label className="font-label-caps text-[10px] text-on-surface-variant block uppercase font-semibold" htmlFor="fac-subzone">
                    Default Sub-Facility Storage Zone
                  </label>
                  <input
                    id="fac-subzone"
                    type="text"
                    required
                    value={subzone}
                    onChange={(e) => setSubzone(e.target.value)}
                    className="bg-surface-container-low border border-outline focus:border-accent text-on-surface w-full h-10 px-3 rounded-clinical font-mono-data focus:ring-0 focus:outline-none text-sm"
                  />
                </div>

                {/* System ID */}
                <div className="space-y-1.5">
                  <label className="font-label-caps text-[10px] text-on-surface-variant block uppercase font-semibold" htmlFor="sys-id">
                    Warehouse Cluster Registry ID
                  </label>
                  <input
                    id="sys-id"
                    type="text"
                    disabled
                    value={sysID}
                    className="bg-surface-container-low/50 border border-outline/40 text-on-surface-variant/70 w-full h-10 px-3 rounded-clinical font-mono-data cursor-not-allowed text-sm"
                  />
                </div>
              </div>

              {/* Feedback Success */}
              {facilitySuccess && (
                <div className="p-3 bg-success/15 border border-success/35 text-success rounded-clinical flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4" />
                  <span className="text-xs font-semibold">Facility parameters updated successfully.</span>
                </div>
              )}

              {/* Save Button */}
              <button
                type="submit"
                disabled={facilitySaving}
                className="flex items-center justify-center gap-2 px-5 py-2.5 bg-primary text-on-primary-container hover:opacity-90 active:scale-95 disabled:opacity-50 disabled:pointer-events-none font-label-caps text-label-caps text-[10px] font-bold rounded-clinical transition-all text-on-primary"
              >
                {facilitySaving ? <RefreshCw className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
                {facilitySaving ? 'UPDATING PARAMETERS...' : 'SAVE FACILITY DETAILS'}
              </button>
            </form>
          </TabsContent>

          {/* TAB 3: Security Protocols */}
          <TabsContent value="security">
            <form onSubmit={handleSaveSecurity} className="space-y-6 max-w-xl">
              <div className="space-y-6">
                {/* 2FA checkbox */}
                <div className="flex items-start gap-3">
                  <input
                    id="tfa"
                    type="checkbox"
                    checked={tfaEnabled}
                    onChange={(e) => setTfaEnabled(e.target.checked)}
                    className="mt-1 rounded border-outline bg-surface-container-low text-primary focus:ring-0 cursor-pointer"
                  />
                  <div>
                    <label className="font-label-caps text-[10px] text-on-surface block uppercase font-bold cursor-pointer" htmlFor="tfa">
                      Enable Multi-Factor Credential Verification
                    </label>
                    <p className="text-[11px] text-on-surface-variant/80 mt-0.5">
                      Verify secure operators with a hardware security token or authenticator app code on login access.
                    </p>
                  </div>
                </div>

                {/* Auto Quarantine checkbox */}
                <div className="flex items-start gap-3">
                  <input
                    id="quar"
                    type="checkbox"
                    checked={autoQuarantine}
                    onChange={(e) => setAutoQuarantine(e.target.checked)}
                    className="mt-1 rounded border-outline bg-surface-container-low text-primary focus:ring-0 cursor-pointer"
                  />
                  <div>
                    <label className="font-label-caps text-[10px] text-on-surface block uppercase font-bold cursor-pointer" htmlFor="quar">
                      Automated Expiry Quarantine Execution
                    </label>
                    <p className="text-[11px] text-on-surface-variant/80 mt-0.5">
                      Immediately transition active stock categories into LOCKED status when remaining days threshold breaches &lt; 0 days.
                    </p>
                  </div>
                </div>

                {/* Session Timeout */}
                <div className="space-y-1.5 max-w-xs">
                  <label className="font-label-caps text-[10px] text-on-surface-variant block uppercase font-semibold">
                    Inactivity Session Timeout Limits
                  </label>
                  <Select value={timeout} onValueChange={setTimeoutVal}>
                    <SelectTrigger>
                      <SelectValue placeholder="15 min" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="15 min">15 Minutes</SelectItem>
                      <SelectItem value="30 min">30 Minutes</SelectItem>
                      <SelectItem value="60 min">1 Hour</SelectItem>
                      <SelectItem value="4 hours">4 Hours (Shift Span)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Feedback Success */}
              {securitySuccess && (
                <div className="p-3 bg-success/15 border border-success/35 text-success rounded-clinical flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4" />
                  <span className="text-xs font-semibold">Security rules and audit timeouts updated.</span>
                </div>
              )}

              {/* Save Button */}
              <button
                type="submit"
                disabled={securitySaving}
                className="flex items-center justify-center gap-2 px-5 py-2.5 bg-primary text-on-primary-container hover:opacity-90 active:scale-95 disabled:opacity-50 disabled:pointer-events-none font-label-caps text-label-caps text-[10px] font-bold rounded-clinical transition-all text-on-primary"
              >
                {securitySaving ? <RefreshCw className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
                {securitySaving ? 'COMMITTING SECURITY...' : 'SAVE SECURITY DECREES'}
              </button>
            </form>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
