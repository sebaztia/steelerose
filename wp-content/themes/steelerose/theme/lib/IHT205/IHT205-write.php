<?php
namespace SteeleRose\IHT205;

use setasign\Fpdi\Fpdi;

class Write {

    public $dataSourcePath =
        __DIR__ . "/IHT-205.json";
    public $pdfSourcePath =
        __DIR__ . "/IHT205 form.pdf";
    private $pdfWebPath;
    public $data = false;

    private $outputDir =
        __DIR__ . "/output";
    private $pdfFiles = [];
    private $user_id = 0;
    private $filename;

    private $pdf;

    public function __construct($user_id) {
        $this->user_id =
            $user_id;
        $this->pdfWebPath =
            get_stylesheet_directory_uri() . '/theme/lib/IHT205/output/';
    }

    public function createPdf() {
        if(!$this->data) {
            $pages =
                $this->getData();
        } else {
            $pages = $this->data;
        }

        foreach($pages as $index => $page) {

            $this->pdf = new Fpdi();
            $this->pdf->addPage();
            $this->pdf->setSourceFile(
                $this->pdfSourcePath
            );

            $index =
                $index + 1;

            $pid =
                $this->pdf->importPage(
                    $index
                );

            $size =
                $this->pdf->getTemplateSize($pid);

            $this->pdf->useTemplate(
                $pid,
                null,
                null,
                $size['width'],
                $size['height'],
                false
            );

            $this->pdf->SetFont('Arial');
            $this->pdf->SetFontSize(8);
            $this->pdf->SetTextColor(
                255,0,0
            );

            foreach($page as $field) {

                if($field->type==='textsep') {
                    $this->pdf->
                    SetFontSpacing(10);

                    $values =
                        explode(" ", $field->value);

                    for($i=0; $i<count($values); $i++) {
                        $this->pdf->SetXY(
                            $field->x[$i],
                            $field->y[$i]
                        );

                        $this->pdf->Write(
                            0,
                            $values[$i]
                        );
                    }

                    $this->pdf->
                    SetFontSpacing(1);

                } else if($field->type==='checkbox' || $field->type==='ab') {

                    $mark = "X";
                    $values =
                        $field->value;

                    for($i=0; $i<count($values); $i++) {
                        if($values[$i]) {

                            $this->pdf->SetXY(
                                $field->x[$i],
                                $field->y[$i]
                            );

                            $this->pdf->Write(
                                0,
                                $mark
                            );
                        }
                    }
                } else if($field->type==='textarea') {

                    $this->pdf->SetXY(
                        $field->x,
                        $field->y
                    );

                    $this->pdf->MultiCell(
                        90, 4, $field->value, 0);

                } else if($field->type==='textbig') {

                    $this->pdf->SetXY(
                        $field->x,
                        $field->y
                    );

                    $this->pdf->MultiCell(
                        165, 4, $field->value, 0);

                } else if($field->type==='image') {

                    if($field->value) {
                        $this->pdf->SetXY(
                            $field->x,
                            $field->y
                        );

                        $this->pdf->Image(
                            $field->value
                        );
                    }

                } else {
                    $this->pdf->SetXY(
                        $field->x,
                        $field->y
                    );

                    $this->pdf->Write(
                        0,
                        $field->value
                    );
                }
            }

            $file = $this->outputDir .
                '/page-'.$index.'.pdf';
            $this->pdfFiles[] = $file;

            $this->pdf->Output(
                $file,
                'F'
            );
        }

        return $this->concat();
    }

    private function concat() {
        $this->pdf = new Fpdi();

        foreach($this->pdfFiles AS $file) {
            $pageCount = $this->pdf->setSourceFile($file);
            for ($pageNo = 1; $pageNo <= $pageCount; $pageNo++) {
                $pageId = $this->pdf->ImportPage($pageNo);
                $s = $this->pdf->getTemplatesize($pageId);
                $this->pdf->AddPage($s['orientation'], $s);
                $this->pdf->useImportedPage($pageId);
            }
        }

        $this->filename =  '/' . uniqid() . '.pdf';

        $file =
            $this->outputDir . $this->filename;
        $this->pdf->Output(
            $file,
            'F'
        );

        return $file;
    }

    public function getData() {
        $data =
            file_get_contents(
                $this->dataSourcePath
            );

        return json_decode($data)->pages;
    }

    public function setData($data) {
        $this->data = $data;
    }

    public function HttpUrl() {
        return $this->pdfWebPath . $this->filename;
    }

    public function send($file) {
        $data = file_get_contents($file);
        header("Content-type: application/octet-stream");
        header("Content-disposition: attachment;filename=" . $file);

        echo $data;
    }
}

/*$w = new Write();
$file =
    $w->createPdf();

print($file);*/