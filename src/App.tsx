import { useState, useEffect, useRef } from 'react';
import { Tabs, Tab } from './components/atoms';
import { RequestPanel, BodyEditor, HeadersPanel, ResponsePanel, AuthorizationPanel, ImportCurlModal, ShareModal } from './components/molecules';
import { ApiClient } from './utils/api-client';
import { CurlParser } from './utils/curl-parser';
import type { HttpMethod, Header, ApiResponse, TabType, Authentication } from './types';
import type { ParsedCurlRequest } from './utils/curl-parser';
import './App.css';

function App() {
  // Request state
  const [url, setUrl] = useState('');
  const [method, setMethod] = useState<HttpMethod>('GET');
  const [body, setBody] = useState('');
  const [headers, setHeaders] = useState<Header[]>([]);
  const [authentication, setAuthentication] = useState<Authentication>({
    type: 'None',
    token: '',
    enabled: false,
  });

  // UI state
  const [activeTab, setActiveTab] = useState<TabType>('body');
  const [response, setResponse] = useState<ApiResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isImportModalOpen, setIsImportModalOpen] = useState(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const hasLoadedFromUrl = useRef(false);

  // Handle import from cURL
  const handleImportCurl = (parsed: ParsedCurlRequest) => {
    console.log('Importing cURL data:', parsed);
    setUrl(parsed.url);
    setMethod(parsed.method);
    setBody(parsed.body);
    setHeaders(parsed.headers);
    setAuthentication(parsed.authentication);
    
    // Switch to body tab if there's body content
    if (parsed.body) {
      setActiveTab('body');
    }
  };

  // Load from URL parameter on mount (only once)
  useEffect(() => {
    if (hasLoadedFromUrl.current) return;
    
    const urlParams = new URLSearchParams(window.location.search);
    const curlParam = urlParams.get('curl');
    
    console.log('URL parameter curl:', curlParam);
    
    if (curlParam) {
      try {
        // URLSearchParams.get() automatically decodes the parameter
        // Decode the base64-encoded cURL command
        const decodedCurl = atob(curlParam);
        console.log('Decoded cURL from URL:', decodedCurl);
        
        // Parse the cURL command
        const parsed = CurlParser.parse(decodedCurl);
        console.log('Parsed cURL:', parsed);
        
        if (parsed) {
          handleImportCurl(parsed);
          hasLoadedFromUrl.current = true;
        } else {
          console.error('Failed to parse cURL - parser returned null');
        }
      } catch (error) {
        console.error('Failed to parse cURL from URL:', error);
      }
    } else {
      console.log('No curl parameter found in URL');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Only run on mount

  // Handle send request
  const handleSend = async () => {
    setIsLoading(true);
    setResponse(null);

    const apiResponse = await ApiClient.sendRequest({
      url,
      method,
      headers,
      body: method !== 'GET' ? body : '',
      authentication,
    });

    setResponse(apiResponse);
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col">
      {/* Import cURL Modal */}
      <ImportCurlModal
        isOpen={isImportModalOpen}
        onClose={() => setIsImportModalOpen(false)}
        onImport={handleImportCurl}
      />

      {/* Share Modal */}
      <ShareModal
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
        request={{
          url,
          method,
          headers,
          body: method !== 'GET' ? body : '',
          authentication,
        }}
      />

      {/* Request Section */}
      <RequestPanel
        url={url}
        method={method}
        onUrlChange={setUrl}
        onMethodChange={setMethod}
        onSend={handleSend}
        onImportCurl={() => setIsImportModalOpen(true)}
        onShare={() => setIsShareModalOpen(true)}
        isLoading={isLoading}
      />

      {/* Main Content Area - Responsive Layout */}
      <div className="flex flex-col md:flex-row flex-1 overflow-hidden">
        {/* Left Panel - Request Configuration */}
        <div className="w-full md:w-1/2 border-b md:border-b-0 md:border-r border-gray-800 flex flex-col">
          <Tabs className="px-4 md:px-6">
            <Tab
              label="Body"
              isActive={activeTab === 'body'}
              onClick={() => setActiveTab('body')}
            />
            <Tab
              label="Authorization"
              isActive={activeTab === 'authorization'}
              onClick={() => setActiveTab('authorization')}
            />
            <Tab
              label="Headers"
              isActive={activeTab === 'headers'}
              onClick={() => setActiveTab('headers')}
            />
          </Tabs>

          <div className="flex-1 overflow-auto">
            {activeTab === 'body' && (
              <BodyEditor
                value={body}
                onChange={setBody}
                disabled={method === 'GET'}
              />
            )}

            {activeTab === 'headers' && (
              <HeadersPanel headers={headers} onChange={setHeaders} />
            )}

            {activeTab === 'authorization' && (
              <AuthorizationPanel
                authentication={authentication}
                onChange={setAuthentication}
              />
            )}
          </div>
        </div>

        {/* Right Panel - Response */}
        <div className="w-full md:w-1/2 flex flex-col">
          <ResponsePanel response={response} isLoading={isLoading} />
        </div>
      </div>
    </div>
  );
}

export default App;
