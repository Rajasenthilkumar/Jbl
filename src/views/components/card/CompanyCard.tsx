interface CardProps {
  cardinfoclassName: string;
  title: string;
  titleValue: string;
  companytitle: string;
  companyValue: string | null | number;
  companyclassName: string;
  countrytitle: string;
  countrytitleValue: string;
  vatDetail: string;
  vatDetailValue: string;
  addresstitle: string;
  addresstextValue: string | null;
  documenttitle: string;
  documenttitleValue: string | null;
  // addressProofTitle: string;
  addressProofTitleValue: string | null | undefined;
  subclassName: string;
  textDetailsclassName: string;
  profileType: string;
}

const CompanyCardComponent: React.FC<CardProps> = ({
  cardinfoclassName,
  profileType,
  title,
  titleValue,
  companytitle,
  companyValue,
  companyclassName,
  countrytitle,
  countrytitleValue,
  vatDetail,
  vatDetailValue,
  addresstitle,
  addresstextValue,
  documenttitle,
  documenttitleValue,
  // addressProofTitle, will use in sprint-3
  addressProofTitleValue,
  subclassName,
  textDetailsclassName,
}) => {
  const getFileIcon = (fileName: string | undefined) => {
    if (!fileName) {
      return '/images/icons/doc_upload.png';
    }

    const extension = fileName.split('.').pop()?.toLowerCase();

    switch (extension) {
      case 'pdf':
        return '/images/icons/doc_upload.png';
      case 'doc':
        return '/images/icons/doc_upload.png';
      case 'docx':
        return '/images/icons/doc_upload.png';
      case 'ppt':
        return '/images/icons/doc_upload.png';
      case 'pptx':
        return '/images/icons/doc_upload.png';
      case 'xls':
        return '/images/icons/doc_upload.png';
      case 'xlsx':
        return '/images/icons/doc_upload.png';
      case 'txt':
        return '/images/icons/doc_upload.png';
      default:
        return '/images/icons/doc_upload.png';
    }
  };

  const getFileName = (documenttitleValue: string) => {
    const filePath = documenttitleValue || '/docs/file.pdf';
    const fileNameData = filePath.substring(filePath.lastIndexOf('/') + 1);
    return fileNameData;
  };

  return (
    <div className="bg-white br-bl-10px custom-companycard">
      <div className="grid grid-cols-1 md:grid-cols-2 md:grid-cols-[50%_50%] gap-2 mt-2 mb-4">
        <div className="">
          <div className="">
            <h2 className={subclassName}>{title}</h2>
            <div className={cardinfoclassName}>
              <p className={companyclassName}>{titleValue}</p>
            </div>
          </div>
        </div>
        <div className="">
          <div className="">
            <h2 className={subclassName}>{companytitle}</h2>
            <div className={cardinfoclassName}>
              <p className={textDetailsclassName}>{companyValue}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 md:grid-cols-[50%_50%] gap-2 mt-2 mb-4">
        <div className="">
          <div className="">
            <h2 className={subclassName}>{countrytitle}</h2>
            <div className={cardinfoclassName}>
              <p className={textDetailsclassName}>{countrytitleValue}</p>
            </div>
          </div>
        </div>
        {profileType === 'Juristic' && (
          <div>
            <div>
              <h2 className={subclassName}>{vatDetail}</h2>
              <div className={cardinfoclassName}>
                <p className={textDetailsclassName}>{vatDetailValue}</p>
              </div>
            </div>
          </div>
        )}
        <div className="grid grid-cols-1 md:grid-cols-2 md:grid-cols-[50%_50%] gap-2 mt-2 mb-4">
          <div className="">
            <div className="">
              <h2 className={subclassName}>{addresstitle}</h2>
              <div className={cardinfoclassName}>
                <p className={textDetailsclassName}>{addresstextValue}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 md:grid-cols-[50%_50%] gap-2 mt-2 mb-4">
        {/* <div className="register-business">
          <h2 className={subclassName}>{addressProofTitle}</h2>
          <div className={cardinfoclassName}>
            <p className={textDetailsclassName}>
              <img
                src={getFileIcon(documenttitleValue ?? '')}
                alt="File Icon"
                style={{
                  width: '16px',
                  height: '16px',
                  marginRight: '8px',
                }}
              />
              {getFileName(documenttitleValue ?? '')}
            </p>
          </div>
        </div> Commenting to sprint-3*/}
        <div className="">
          <div className="register-business">
            <h2 className={subclassName}>{documenttitle}</h2>
            <div className={cardinfoclassName}>
              <p className={textDetailsclassName}>
                <img
                  src={getFileIcon(addressProofTitleValue ?? undefined)}
                  alt="File Icon"
                  style={{
                    width: '16px',
                    height: '16px',
                    marginRight: '8px',
                  }}
                />
                {getFileName(documenttitleValue ?? '')}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default CompanyCardComponent;
