interface EmailTemplateProps {
  emailToSend: string;
  fileName: string;
  fileUrl: string;
}

export const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
  emailToSend,
  fileName,
  fileUrl
}) => (
  <div className="min-h-screen bg-primary-foreground">
    <center>
      <table className="w-full bg-primary-foreground">
        <tbody>
          <tr>
            <td className="text-center">
              <table className="w-[690px] mx-auto">
                <tbody>
                  <tr>
                    <td className="p-9">
                      <table className="w-full">
                        <tbody>
                          <tr>
                            <td className="rounded-lg bg-background">
                              <table className="w-full">
                                <tbody>
                                  <tr>
                                    <td>
                                      <table className="w-full">
                                        <tbody>
                                          <tr>
                                            <td className="text-center py-[70px] px-4 pb-4">
                                              <a href="#" target="_blank" rel="noopener noreferrer" className="inline-block">
                                                <img src="/logo.svg" alt="Logo" />
                                              </a>
                                            </td>
                                          </tr>
                                        </tbody>
                                      </table>

                                      <table className="w-full">
                                        <tbody>
                                          <tr>
                                            <td className="text-xl font-bold text-foreground text-center tracking-tight pb-2">
                                              Hello {emailToSend.split("@")[0]}
                                            </td>
                                          </tr>

                                          <tr>
                                            <td className="text-sm text-foreground/40 leading-5 text-center pb-3">
                                              Someone have shared a file with you:
                                              <br />
                                              <strong>{fileName}</strong>
                                            </td>
                                          </tr>

                                          <tr>
                                            <td className="px-11">
                                              <table className="w-full ">
                                                <tbody>
                                                  <tr>
                                                    <td className="pb-5">
                                                      <table className="w-full ">
                                                        <tbody>
                                                          <tr>
                                                            <td className="text-center pb-8">
                                                              <img src="/sharing_file.svg" alt="" />
                                                            </td>
                                                          </tr>

                                                          <tr>
                                                            <td className="text-sm text--foreground/40 leading-5 text-center px-6 pb-8">
                                                              You can view the file using the link below. If you have any questions or need further assistance, please contact us at info@yourwebsite.com.
                                                              <br /><br />
                                                              <a href={fileUrl} className="text-blue-600 underline">View File</a>
                                                            </td>
                                                          </tr>
                                                        </tbody>
                                                      </table>
                                                    </td>
                                                  </tr>
                                                </tbody>
                                              </table>
                                            </td>
                                          </tr>
                                        </tbody>
                                      </table>
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </td>
                  </tr>
                </tbody>
              </table>
            </td>
          </tr>
        </tbody>
      </table>
    </center>
  </div>
);